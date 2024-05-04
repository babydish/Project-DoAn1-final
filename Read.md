 Một vài hữu ích khi sử dụng SCSS thay vì viết CSS:

Thay đổi cách viết từ dạng thuộc lòng các thuộc tính và giá trị, sang cách viết có tính logic hơn, giúp cho lập trình viên cảm thấy mới mẻ hơn.
Source code gọn gàng hơn, vì sử dụng cách viết biến, hàm, vòng lặp, câu điều kiện, ...
Tái sử dụng source code tốt hơn.
Do viết bằng biến, hàm, ... và tái sử dụng code, nên khả năng kiểm soát source code tốt hơn so với viết bằng CSS thông thường.
 - local host : host la noi de luu tru

 - Mongodb : document db => luu tru db bang dang document 

 - điều kiện là tùy chọn và nếu điều kiện là null hoặc không xác định, mongoose sẽ gửi lệnh findOne trống tới MongoDB, lệnh này sẽ trả về một tài liệu tùy ý. Nếu bạn đang truy vấn theo _id, thay vào đó hãy sử dụng findById().

 mongoose.Schema là một lớp dùng để định nghĩa cấu trúc dữ liệu (schema) cho một collection trong MongoDB. Một schema mô tả các thuộc tính (hoặc trường) và kiểu dữ liệu của chúng trong một collection cụ thể.

Khi bạn tạo một schema bằng mongoose.Schema, bạn định nghĩa các trường dữ liệu cùng với kiểu dữ liệu tương ứng của chúng và các ràng buộc khác như bắt buộc (required), mặc định (default), và nhiều hơn nữa.


middleware:
 1. validate
 2. k cho vao
 3. cho phep vao ( validation passaed)
 4. chinh sua / thay doi

 socket.io
    cho phép xử lí việc giao tiếp giữa server và client ngay lập tức và chiếm ít tài nguyên nhất

    USER A ---> SERVER --> user B

     

  const user = req.session.user;
   res.locals.userData = user;
   2 dong nay co o moi controller de truyen userData vao header moi trang . vi neu chi de o 1 controller no chi co tac dung voi controller do => cach cua toi ( hoang tuan anh) la dat vao moi controller (day la cach tam thoi (cach ngu) de giai quyet van de truoc mat)
