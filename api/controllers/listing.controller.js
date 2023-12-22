import Listing from "../models/listing.model.js";
import { errorHandler } from "../utils/error.js";

export const createListing = async (req, res, next) => {
  try {
    const listing = await Listing.create(req.body);
    return res.status(201).json(listing);
  } catch (error) {
    next(error);
  }
};

export const updateListings = async (req, res, next) => {
  const listing = await Listing.findById(req.params.id);
  if (!listing) {
    return next(errorHandler(404, "Listing not found!"));
  }
  if (req.user.id !== listing.userRef) {
    return next(errorHandler(403, "You can only update your own listings!"));
  }

  try {
    const updatedListing = await Listing.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedListing);
  } catch (error) {
    next(error);
  }
};

export const deleteListings = async (req, res, next) => {
  const listing = await Listing.findById(req.params.id);
  if (!listing) {
    return next(errorHandler(404, "Listing not found!"));
  }
  if (req.user.id !== listing.userRef) {
    return next(errorHandler(403, "You can only delete your own listings!"));
  }

  try {
    await Listing.findByIdAndDelete(req.params.id);
    return res.status(200).json("Listing deleted!");
  } catch (error) {
    next(error);
  }
};

export const getListing = async (req, res, next) => {
  try {
    const listing = await Listing.findById(req.params.id);

    if (!listing) {
      return next(errorHandler(404, "Listing not found!"));
    }

    res.status(200).json(listing);
  } catch (error) {
    next(error);
  }
};

export const searchForListings = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit) || 9;
    const startIndex = parseInt(req.query.startIndex) || 0;
    let offer = req.query.offer;
    let furnished = req.query.furnished;
    let parking = req.query.parking;
    let type = req.query.type;
    let searchTerm = req.query.searchTerm || "";
    let sort = req.query.sort || "createdAt";
    let order = req.query.order || "desc";

    if (offer === undefined || offer === "false") {
      offer = { $in: [false, true] };
    }
    if (furnished === undefined || furnished === "false") {
      furnished = { $in: [false, true] };
    }
    if (parking === undefined || parking === "false") {
      parking = { $in: [false, true] };
    }
    if (type === undefined || type === "all") {
      type = { $in: ["sale", "rent"] };
    }

    const searchedListings = await Listing.find({
      name: { $regex: searchTerm, $options: "i" },
      offer,
      furnished,
      parking,
      type,
    })
      .sort({ [sort]: order })
      .limit(limit)
      .skip(startIndex);

    return res.status(200).json(searchedListings);
  } catch (error) {
    next(error);
  }
};


//Different way to create search API route
// export const searchForListings = async (req, res, next) => {
//   try {
//     const limit = parseInt(req.query.limit) || 9;
//     const startIndex = parseInt(req.query.startIndex) || 0;
//     let offer = req.query.offer;
//     let furnished = req.query.furnished;
//     let parking = req.query.parking;
//     let type = req.query.type;
//     let searchTerm = req.query.searchTerm || "";
//     let sort = req.query.sort || "createdAt";
//     let order = req.query.sort || "desc";

//     if (offer === "undefined" || offer === "false") {
//       offer = { $in: [false, true] };
//     }
//     if (furnished === "undefined" || furnished === "false") {
//       furnished = { $in: [false, true] };
//     }
//     if (parking === "undefined" || parking === "false") {
//       parking = { $in: [false, true] };
//     }
//     if (type === "undefined" || type === "all") {
//       type = { $in: ["sale", "rent"] };
//     }

//     const { keyword } = req.query;

//     // Create a regular expression to perform a case-insensitive search
//     const regex = new RegExp(keyword, "i");

//     // Search for listings that match the keyword in the title or description
//     const searchedListings = await Listing.find({
//       $or: [
//         { title: regex },
//         { description: regex }
//       ],
//       offer,
//       furnished,
//       parking,
//       type
//     })
//       .sort({ [sort]: order })
//       .skip(startIndex)
//       .limit(limit);

//     res.status(200).json(searchedListings);
//   } catch (error) {
//     next(error);
//   }
// };
