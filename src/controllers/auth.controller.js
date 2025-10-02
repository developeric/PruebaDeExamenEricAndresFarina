import { hashPassword } from "../helpers/bcrypt.helper";
import { UserModel } from "../models/mongoose/user.model";

export const register = async (req, res) => {
  const { username, email, password, role, profile } = req.body;
  try {
    const existEmail = await UserModel.findOne({ email: email });
    if(existEmail){
      return res.status(200).json({msg:"Correo Ya Registrado"})
    }
    const hashedPassword = await hashPassword(password);
    const user = await UserModel.create({
      username,
      email,
      password: hashedPassword,
      role,
      profile,
    });
    if (!user) {
      return res.status(400).json({ ok: false, msg: "No Creado", data: null });
    }
    return res
      .status(201)
      .json({ msg: "Usuario registrado correctamente", data: user });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};

export const login = async (req, res) => {
  try {
    // TODO: buscar user, validar password, firmar JWT y setear cookie httpOnly
    return res.status(200).json({ msg: "Usuario logueado correctamente" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};

export const getProfile = async (req, res) => {
  try {
    // TODO: devolver profile del user logueado actualmente
    return res.status(200).json({ data: profile });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};

export const logout = async (_req, res) => {
  res.clearCookie("token");
  return res.status(204).json({ msg: "Sesión cerrada correctamente" });
};
