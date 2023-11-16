import Listing from "../models/listing.model";

export const createListing = async (req, res, next) => {
    try {
        const listing = await Listing.create(req.body)
    } catch (error) {
        next(error)
    }
};
