const envSchema = {
    type: "object",
    required: ["PORT", "PATH_API", "TZ"],
    properties: {
        PORT: { type: "number", default: "3000" },
        PATH_API: { type: "string", default: "/api/v1" },
        TZ: { type: "string", default: 'America/Sao_Paulo' },
    },
};

export default envSchema;