# Database Models Documentation

Thư mục này chứa các định nghĩa Schema của Mongoose cho cơ sở dữ liệu MongoDB của ứng dụng bán vé sự kiện âm nhạc 8 Threads Event. Dưới đây là chi tiết về các model, các trường (fields), định dạng dữ liệu và các ràng buộc.

---

## 1. User (`User.js`)
Lưu trữ thông tin người dùng, phân quyền và quản lý giỏ hàng.

| Field | Type | Constraints/Default | Description |
| :--- | :--- | :--- | :--- |
| `userId` | String | `required`, `unique` | ID duy nhất của người dùng |
| `firstName` | String | `required` | Tên của người dùng |
| `lastName` | String | `required` | Họ của người dùng |
| `email` | String | `required`, `unique` | Địa chỉ email đăng nhập |
| `phone` | String | | Số điện thoại liên hệ |
| `avatar` | String | | URL hình ảnh đại diện |
| `role` | String | `enum: ['customer', 'admin']`, `default: 'customer'` | Vai trò của người dùng |
| `status` | String | `enum: ['active', 'inactive']`, `default: 'active'` | Trạng thái hoạt động |
| `authProvider` | String | `enum: ['local', 'google', 'facebook']`, `default: 'local'` | Nhà cung cấp xác thực |
| `providerId` | String | `default: null` | ID từ nhà cung cấp xác thực bên thứ ba |
| `password` | String | `required nếu authProvider = 'local'` | Mật khẩu đã mã hóa |
| `cart` | Array | `default: []` | Giỏ hàng chứa các sản phẩm |
| `timestamps` | Boolean | `true` | Tự động thêm `createdAt`, `updatedAt` |

---

## 2. Event (`Event.js`)
Lưu trữ thông tin các sự kiện (buổi hòa nhạc, liveshow).

| Field | Type | Constraints/Default | Description |
| :--- | :--- | :--- | :--- |
| `eventId` | String | `required`, `unique` | ID duy nhất sự kiện |
| `name` | String | `required` | Tên sự kiện |
| `categoryId` | String | `required` | ID danh mục sự kiện |
| `description` | String | | Mô tả chi tiết sự kiện |
| `img` | String | | URL hình ảnh đại diện sự kiện |
| `time.event.start` | Date | `required` | Thời gian bắt đầu sự kiện |
| `time.event.end` | Date | `required` | Thời gian kết thúc sự kiện |
| `time.sale.start` | Date | `required` | Thời gian bắt đầu bán vé |
| `time.sale.end` | Date | `required` | Thời gian kết thúc bán vé |
| `venue.name` | String | | Tên địa điểm |
| `venue.city` | String | | Thành phố |
| `venue.country` | String | | Quốc gia |
| `status` | String | `enum: ['active', 'inactive']`, `default: 'active'` | Trạng thái của sự kiện |
| `createdBy` | String | | ID người tạo sự kiện (admin) |
| `timestamps` | Boolean | `true` | Tự động thêm `createdAt`, `updatedAt` |

---

## 3. TicketType (`TicketType.js`)
Lưu trữ định nghĩa các loại vé cho mỗi sự kiện.

| Field | Type | Constraints/Default | Description |
| :--- | :--- | :--- | :--- |
| `_id` | String | `required` | ID duy nhất loại vé (custom) |
| `eventId` | String | `required` | ID sự kiện mà loại vé này thuộc về |
| `name` | String | `required` | Tên loại vé (VIP, Normal, Pass) |
| `type` | String | `required` | Loại vé: `'pass'`, `'vip'`, `'normal'` |
| `price` | Number | `required` | Giá vé (đơn vị: VND) |
| `totalQuantity` | Number | `required` | Tổng số lượng vé trong loại này |
| `soldQuantity` | Number | `default: 0` | Số lượng vé đã bán |
| `isActive` | Boolean | `default: true` | Trạng thái có hoạt động hay không |
| `timestamps` | Boolean | `true` | Tự động thêm `createdAt`, `updatedAt` |

---

## 4. Ticket (`Ticket.js`)
Lưu trữ thông tin từng vé cụ thể với mã QR và trạng thái.

| Field | Type | Constraints/Default | Description |
| :--- | :--- | :--- | :--- |
| `ticketId` | String | `required`, `unique` | ID duy nhất vé |
| `eventId` | String | `required` | ID sự kiện |
| `ticketTypeId` | String | `required` | ID loại vé (liên kết đến TicketType) |
| `orderId` | String | `required` | ID đơn hàng mua vé |
| `ownerId` | String | `required` | ID người sở hữu vé (User) |
| `qrCode` | String | `required`, `unique` | Mã QR duy nhất dùng cho check-in |
| `status` | String | `enum: ['valid', 'invalid', 'pending', 'used']`, `default: 'pending'` | Trạng thái vé |
| `timestamps` | Boolean | `true` | Tự động thêm `createdAt`, `updatedAt` |

**Trạng thái vé:**
- `pending` - Vé mới tạo, chưa xác nhận
- `valid` - Vé hợp lệ, sẵn sàng sử dụng
- `used` - Vé đã được sử dụng (check-in)
- `invalid` - Vé không hợp lệ, bị hủy

---

## 5. Order (`Order.js`)
Lưu trữ thông tin đơn đặt hàng của người dùng.

| Field | Type | Constraints/Default | Description |
| :--- | :--- | :--- | :--- |
| `orderId` | String | `required`, `unique` | ID duy nhất đơn hàng |
| `userId` | String | `required` | ID người mua (liên kết đến User) |
| `totalAmount` | Number | `required` | Tổng tiền đơn hàng (đơn vị: VND) |
| `status` | String | `enum: ['pending', 'paid', 'cancelled']`, `default: 'pending'` | Trạng thái đơn hàng |
| `paymentMethod` | String | `enum: ['cash', 'vnpay', 'credit_card']`, `required` | Phương thức thanh toán |
| `address` | String | | Địa chỉ giao hàng/nhận vé |
| `timestamps` | Boolean | `true` | Tự động thêm `createdAt`, `updatedAt` |

**Trạng thái đơn hàng:**
- `pending` - Đơn hàng mới tạo, chờ thanh toán
- `paid` - Đơn hàng đã thanh toán thành công
- `cancelled` - Đơn hàng bị hủy

---

## 6. OrderTicket (`OrderTicket.js`)
Lưu trữ mối quan hệ giữa đơn hàng và sự kiện.

| Field | Type | Constraints/Default | Description |
| :--- | :--- | :--- | :--- |
| `eventId` | String | `required` | ID sự kiện |
| `orderId` | String | `required` | ID đơn hàng |
| `createdAt` | Date | `default: Date.now` | Thời gian tạo |

**Mục đích:** Ghi lại mối quan hệ giữa đơn hàng và sự kiện. Mỗi đơn hàng có thể chứa vé từ một hoặc nhiều sự kiện, giúp theo dõi và query dễ dàng.

---

## 📊 Entity Relationship Diagram

```
User (1) ──────── (N) Order
  │
  └──────── (N) Ticket (ownership)

Event (1) ──────── (N) TicketType
  │
  └──────── (N) Ticket
  └──────── (N) OrderTicket

TicketType (1) ──────── (N) Ticket

Order (1) ──────── (N) OrderTicket
Order (1) ──────── (N) Ticket
```

---

## 🔄 Quy Trình Mua Vé

1. **User** (USR001) muốn mua vé cho **Event** (EVT001)
2. Hệ thống tạo **Order** (ORD001) cho User
3. Order chứa vé từ một hoặc nhiều **TicketType** của Event
4. Hệ thống tạo **Ticket** (TICKET001, TICKET002, ...) cho từng vé
5. Ghi lại quan hệ trong **OrderTicket** để theo dõi

---

## 📋 Một Số Truy Vấn Thường Dùng

### User:
- Lấy tất cả Order của User: `Order.find({ userId })`
- Lấy giỏ hàng: `User.cart`
- Kiểm tra quyền admin: `User.role === 'admin'`

### Event:
- Lấy tất cả TicketType: `TicketType.find({ eventId })`
- Tính vé còn lại: `TicketType.totalQuantity - TicketType.soldQuantity`
- Kiểm tra thời gian bán: `now >= Event.time.sale.start && now <= Event.time.sale.end`

### Order:
- Lấy all Ticket của Order: `Ticket.find({ orderId })`
- Theo dõi trạng thái thanh toán: `Order.status`

### Ticket:
- Check-in bằng QR code: `Ticket.findOne({ qrCode })`
- Cập nhật trạng thái: `Ticket.status = 'used'`

### OrderTicket:
- Lấy all Event của User: `OrderTicket.find({ orderId })`

---

## 🛡️ Validation & Constraints

| Model | Key Constraints |
| :--- | :--- |
| **User** | email unique, userId unique, password required nếu local auth |
| **Event** | eventId unique, timestamps auto |
| **TicketType** | _id custom, totalQuantity ≥ soldQuantity |
| **Ticket** | ticketId unique, qrCode unique, status limited |
| **Order** | orderId unique, totalAmount > 0 |
| **OrderTicket** | mối quan hệ đơn giản, no unique constraint |

---

## 🚀 Ghi Chú Phát Triển

1. **Primary Keys:** Sử dụng String tùy chỉnh thay vì MongoDB ObjectId để dễ quản lý
2. **Enums:** Giới hạn giá trị để đảm bảo data integrity
3. **Relationships:** Sử dụng Foreign Key pattern (lưu ID) thay vì Embedded Documents
4. **Scalability:** Có thể mở rộng để thêm thông tin như discount, voucher vào Order
5. **Indexes:** Cân nhắc thêm indexes cho các trường được query thường xuyên

---

**Cập nhật lần cuối:** 21/04/2026
