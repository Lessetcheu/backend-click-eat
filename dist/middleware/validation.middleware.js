import ApiResponse from "../helpers/response.js";
const validate = (schema) => {
    return async (req, res, next) => {
        const requestWithFiles = req;
        try {
            const data = {
                body: req.body || {},
                params: req.params || {},
                query: req.query || {},
                files: requestWithFiles.files || {},
            };
            await schema.validate(data, {
                abortEarly: false,
                stripUnknown: true,
            });
            next();
        }
        catch (error) {
            if (error.inner && Array.isArray(error.inner) && error.inner.length > 0) {
                const _error = error.inner.reduce((acc, currValue) => {
                    if (currValue.path) {
                        // Supprime le préfixe (body., params., query., files.)
                        const cleanPath = currValue.path.replace(/^(body|params|query|files)\./, '');
                        const message = currValue.message.replace(/^(body|params|query|files)\./, '');
                        if (!acc[cleanPath]) {
                            acc[cleanPath] = message;
                        }
                    }
                    return acc;
                }, {});
                return;
            }
            // For other errors (eg: ValidationError files)
            const rawPath = typeof error.path === 'string' ? error.path : 'error';
            const rawMessage = typeof error.message === 'string' ? error.message : 'Validation error';
            const cleanPath = rawPath.replace(/^(body|params|query|files)\./, '');
            const message = rawMessage.replace(/^(body|params|query|files)\./, '');
            ApiResponse.error(res, "Échec de la validation.", { [cleanPath]: message }, 422);
        }
    };
};
export default validate;
//# sourceMappingURL=validation.middleware.js.map