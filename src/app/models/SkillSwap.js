const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Schema cho người dùng
const UserSchema = new Schema({
    Ten: String,
    Email: String,
    DiaChi: String,
    KỹNangHienTai: [String], // Mảng các kỹ năng hiện tại
    KỹNangMuonHoc: [String] // Mảng các kỹ năng muốn học
});

// Schema cho buổi trao đổi kỹ năng
const SkillExchangeSchema = new Schema({
    UserID1: { type: Schema.Types.ObjectId, ref: 'User' }, // Tham chiếu đến người dùng 1
    UserID2: { type: Schema.Types.ObjectId, ref: 'User' }, // Tham chiếu đến người dùng 2
    ThoiGian: Date,
    DiaDiem: String,
    KỹNangTraoDoi: [String], // Mảng các kỹ năng được trao đổi
    DanhGia: String,
    NhanXet: String
});

// Schema cho nhóm chủ đề
const TopicGroupSchema = new Schema({
    TenNhom: String,
    MoTa: String,
    ThanhVien: [{ type: Schema.Types.ObjectId, ref: 'User' }] // Mảng các thành viên (người dùng)
});

// Schema cho liên kết giữa người dùng và nhóm chủ đề
const UserGroupLinkSchema = new Schema({
    UserID: { type: Schema.Types.ObjectId, ref: 'User' }, // Tham chiếu đến người dùng
    GroupID: { type: Schema.Types.ObjectId, ref: 'TopicGroup' } // Tham chiếu đến nhóm chủ đề
});

// Tạo các model từ schema
const User = mongoose.model('User', UserSchema);
const SkillExchange = mongoose.model('SkillExchange', SkillExchangeSchema);
const TopicGroup = mongoose.model('TopicGroup', TopicGroupSchema);
const UserGroupLink = mongoose.model('UserGroupLink', UserGroupLinkSchema);

// Export các model để có thể sử dụng trong các module khác
module.exports = { User, SkillExchange, TopicGroup, UserGroupLink };
