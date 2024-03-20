 - local host : host la noi de luu tru

 - Mongodb : document db => luu tru db bang dang document 

 - điều kiện là tùy chọn và nếu điều kiện là null hoặc không xác định, mongoose sẽ gửi lệnh findOne trống tới MongoDB, lệnh này sẽ trả về một tài liệu tùy ý. Nếu bạn đang truy vấn theo _id, thay vào đó hãy sử dụng findById().