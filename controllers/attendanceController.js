import { Attendance } from "../models/UserModel.js";

export const markAttendance = async (req, res) => {
    try {
        const attendance = await Attendance.create({ userId: req.user.id, date: new Date() });
        res.json({ message: "Attendance marked", attendance });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const getAttendance = async (req, res) => {
    const attendance = await Attendance.findAll({ where: { userId: req.user.id } });
    res.json(attendance);
};
