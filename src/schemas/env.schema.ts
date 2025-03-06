const envSchema = {
    type: "object",
    required: ["PORT", "PATH_API"],
    properties: {
        PORT: { type: "number", default: "8080" },
        PATH_API: { type: "string", default: "/api/v1" },
    },
};

export default envSchema;