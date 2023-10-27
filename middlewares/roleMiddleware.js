export const requireJobSeekerAuth = (req, res, next) => {
    
    if (req.user && req.user.accounttype === "job seeker") {
        return next();
    }
    return res.status(403).json({ message: "Access denied. Job seeker access required." });
};

export const requireCompanyAuth = (req, res, next) => {
    
    if (req.user && req.user.accounttype === "company") {
        return next();
    }
    return res.status(403).json({ message: "Access denied. Company access required." });
};

export const requireAdminAuth = (req, res, next) => {
   
    if (req.user && req.user.accounttype === "admin") {
        return next();
    }
    return res.status(403).json({ message: "Access denied. Administrator access required." });
};
