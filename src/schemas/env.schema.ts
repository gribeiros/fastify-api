const envSchema = {
    type: "object",
    required: ["PORT"],
    properties: {
        PORT: { type: "number", default: "3000" },
    },
};

export default envSchema;