export const validator = (schema) => (req, res, next) => {
    try {
        schema.parse(req.body);
        next();
    } catch (error) {
        return res.status(400)
        // .errors is an array inside zod that is not transformed to json, 
        // so we go through the array to extract the message of each error.
        .json({ error: error.errors.map((error) => error.message) }
        );
    }
}