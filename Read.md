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

1. Để người dùng A gửi tin nhắn đến người dùng B khi cả hai đều đang hoạt động,cần thực hiện các bước sau:

Xác định người gửi và người nhận: Khi người dùng A gửi một tin nhắn, họ cần chỉ định rằng tin nhắn đó dành cho người dùng B. Điều này thường được thực hiện bằng cách bao gồm user_id của người nhận (người dùng B trong trường hợp này) trong dữ liệu tin nhắn.
Tuy nhiên, điều quan trọng là bạn cần đảm bảo rằng receiver_id bạn đang sử dụng để gửi tin nhắn chính là socket.id của người dùng bạn muốn gửi tin nhắn đến. Nếu receiver_id không phải là socket.id của người dùng đích, thì tin nhắn sẽ không được gửi đúng.

fetch : goi len 1 api de lay ra noi dung duoc luu tru o backend -> render ra cho nguoi dung

api (url): application programing interface
-> cổng giao tiếp giữa các phần mềm

// backend -> api -> fectch -> json/xml


upload file ảnh ở chat: 
//Để nhận được req.file trên máy chủ, biểu mẫu HTML cần có enctype="multipart/form-data" hoặc sử dụng JavaScript để gửi FormData.