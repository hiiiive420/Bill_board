import Billboard from "../models/Billboard.js";
import cloudinary from "../config/cloudinary.js";

const uploadImage = async (file) => {
  const base64 = file.buffer.toString("base64");

  return cloudinary.uploader.upload(
    `data:${file.mimetype};base64,${base64}`,
    { folder: "billboards" }
  );
};

const toBoolean = (value) => value === true || value === "true";

export const createBillboard = async (req, res) => {
  try {
    const { location, width, height, isInDemand, isAvailable } = req.body;

    if (!req.file) {
      return res.status(400).json({ msg: "Image required" });
    }

    if (!location || !width || !height) {
      return res.status(400).json({ msg: "All fields required" });
    }

    const result = await uploadImage(req.file);

    const billboard = await Billboard.create({
      image: result.secure_url,
      location: location.trim(),
      width: Number(width),
      height: Number(height),
      isAvailable: isAvailable === undefined ? true : toBoolean(isAvailable),
      isInDemand: toBoolean(isInDemand),
    });

    res.status(201).json(billboard);
  } catch (error) {
    console.log("CREATE ERROR:", error.message);
    res.status(500).json({ error: error.message });
  }
};

export const updateBillboard = async (req, res) => {
  try {
    const { location, width, height, isInDemand, isAvailable } = req.body;
    const updates = {};

    if (location !== undefined) updates.location = location.trim();
    if (width !== undefined) updates.width = Number(width);
    if (height !== undefined) updates.height = Number(height);
    if (isInDemand !== undefined) updates.isInDemand = toBoolean(isInDemand);
    if (isAvailable !== undefined) updates.isAvailable = toBoolean(isAvailable);

    if (req.file) {
      const result = await uploadImage(req.file);
      updates.image = result.secure_url;
    }

    const billboard = await Billboard.findByIdAndUpdate(req.params.id, updates, {
      new: true,
      runValidators: true,
    });

    if (!billboard) {
      return res.status(404).json({ msg: "Billboard not found" });
    }

    res.json(billboard);
  } catch (error) {
    console.log("UPDATE ERROR:", error.message);
    res.status(500).json({ error: error.message });
  }
};

export const deleteBillboard = async (req, res) => {
  try {
    const billboard = await Billboard.findByIdAndDelete(req.params.id);

    if (!billboard) {
      return res.status(404).json({ msg: "Billboard not found" });
    }

    res.json({ msg: "Billboard deleted", id: req.params.id });
  } catch (error) {
    console.log("DELETE ERROR:", error.message);
    res.status(500).json({ error: error.message });
  }
};

export const getInDemandBillboards = async (req, res) => {
  try {
    const billboards = await Billboard.find({ isInDemand: true });
    res.json(billboards);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAllBillboards = async (req, res) => {
  try {
    const billboards = await Billboard.find().sort({ createdAt: -1 });
    res.json(billboards);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
