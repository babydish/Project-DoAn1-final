const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
// plugin tu dong tao slug
mongoose.plugin(slug);

// Định nghĩa schema cho mô hình
const YourSkill = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, maxLength: 600 },
    image: { type: String, maxLength: 255 },
    skill: { type: String, maxLength: 255 },
    skill_want_to_learn: { type: String, maxLength: 255 },
    slug: { type: String, slug: 'name' } // name se bien thanh chuoi khong dau phan cach boi dau -

}, { timestamps: true });

// Tạo model sử dụng schema đã định nghĩa
// có thể sử dụng model "YourSkills" để tạo, đọc, cập nhật hoặc xóa các bản ghi trong cơ sở dữ liệu MongoDB
const YourSkills = mongoose.model('YourSkill', YourSkill);
module.exports = YourSkills;
