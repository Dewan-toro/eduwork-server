const { Schema, model } = require("mongoose");

const deliveryAddressSchema = new Schema(
  {
    nama: {
      type: String,
      required: [true, "Nama alamat wajib diisi"],
      maxLength: [255, "Panjang maksimal nama alamat 255 karakter"],
    },
    kelurahan: {
      type: String,
      required: [true, "Kelurahan wajib diisi"],
      maxLength: [255, "Panjang maksimal kelurahan 255 karakter"],
    },
    kecamatan: {
      type: String,
      required: [true, "Kecamatan wajib diisi"],
      maxLength: [255, "Panjang maksimal kecamatan 255 karakter"],
    },
    kabupaten: {
      type: String,
      required: [true, "Kabupaten wajib diisi"],
      maxLength: [255, "Panjang maksimal kabupaten 255 karakter"],
    },
    provinsi: {
      type: String,
      required: [true, "Provinsi wajib diisi"],
      maxLength: [255, "Panjang maksimal provinsi 255 karakter"],
    },
    detail: {
      type: String,
      required: [true, "Detail alamat wajib diisi"],
      maxLength: [1000, "Panjang maksimal detail alamat 1000 karakter"],
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

module.exports = model("DeliveryAddress", deliveryAddressSchema);
