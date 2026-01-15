/**
 * ============================================================
 * BÀI TOÁN: Tìm hình vuông lớn nhất trong lưới
 * ============================================================
 * 
 * 🎯 BÀI TOÁN ĐƠN GIẢN HÓA:
 * 
 * Tưởng tượng bạn có một bảng có các đường kẻ ngang và dọc.
 * Một số đường kẻ có thể XÓA được, một số KHÔNG THỂ XÓA.
 * 
 * Khi xóa các đường kẻ, bạn tạo ra các "lỗ hổng" (hole).
 * Mục tiêu: Tìm hình VUÔNG lớn nhất có thể tạo ra.
 * 
 * ============================================================
 * 💡 TẠI SAO "XÓA K THANH → TẠO K+1 Ô"?
 * ============================================================
 * 
 * Hãy tưởng tượng bạn có 4 thanh: 1 ─ 2 ─ 3 ─ 4
 * 
 * Trước khi xóa:
 * ────┬────┬────┬────
 *     │    │    │
 *     1    2    3    4
 * 
 * Mỗi khoảng giữa 2 thanh là 1 ô:
 * - Ô 1: giữa thanh 1-2
 * - Ô 2: giữa thanh 2-3
 * - Ô 3: giữa thanh 3-4
 * 
 * Nếu xóa thanh 2 VÀ 3 (liên tiếp):
 * ────┬────
 *     │
 *     1  [2,3]  4
 * 
 * Bây giờ bạn có 3 ô liền nhau:
 * - Ô 1, 2, 3: giữa thanh 1-4 (gộp lại)
 * 
 * → Xóa 2 thanh → 3 ô = 2 + 1
 * → Xóa k thanh → k + 1 ô
 */

/**
 * ============================================================
 * HÀM 1: findMaxGap(bars) - Tìm khoảng trống lớn nhất
 * ============================================================
 * 
 * 🎯 MỤC ĐÍCH: Tìm chuỗi dài nhất các thanh LIÊN TIẾP có thể xóa
 * 
 * 📝 GIẢI THÍCH TỪNG BƯỚC:
 */
function findMaxGap(bars) {
    // ──────────────────────────────────────────────────────
    // BƯỚC 1: Xử lý trường hợp đặc biệt
    // ──────────────────────────────────────────────────────
    if (bars.length === 0) {
        return 1; 
        // TẠI SAO return 1?
        // - Nếu không có thanh nào để xóa → không tạo được khoảng trống lớn
        // - Nhưng vẫn có ít nhất 1 ô (khoảng tối thiểu giữa các thanh cố định)
        // - Ví dụ: Lưới có 2 thanh cố định → giữa chúng có 1 ô
    }
    
    // ──────────────────────────────────────────────────────
    // BƯỚC 2: Sắp xếp mảng
    // ──────────────────────────────────────────────────────
    bars.sort((a, b) => a - b);
    // TẠI SAO phải sắp xếp?
    // - Để tìm các thanh LIÊN TIẾP (ví dụ: 2, 3, 4)
    // - Nếu không sắp xếp: [4, 2, 3] → khó biết 2,3,4 liên tiếp
    // - Sau khi sắp xếp: [2, 3, 4] → dễ dàng kiểm tra liên tiếp
    // 
    // Ví dụ:
    //   Input: [4, 2, 3, 5]
    //   Sau sort: [2, 3, 4, 5]
    //   → Thấy được chuỗi [2,3,4,5] là 4 thanh liên tiếp
    
    // ──────────────────────────────────────────────────────
    // BƯỚC 3: Tìm chuỗi dài nhất các thanh liên tiếp
    // ──────────────────────────────────────────────────────
    let maxStreak = 1;  // Chuỗi dài nhất tìm được
    let currentStreak = 1;  // Chuỗi hiện tại đang đếm
    
    // TẠI SAO bắt đầu từ 1?
    // - Mỗi thanh riêng lẻ cũng là 1 chuỗi (dù chỉ có 1 phần tử)
    // - Ví dụ: [2, 5] → có 2 chuỗi, mỗi chuỗi dài 1
    
    // Duyệt qua từng phần tử (bắt đầu từ phần tử thứ 2)
    for (let i = 1; i < bars.length; i++) {
        // TẠI SAO bắt đầu từ i=1?
        // - Phần tử đầu tiên (i=0) không có phần tử trước để so sánh
        // - Ta so sánh bars[i] với bars[i-1]
        
        if (bars[i] === bars[i - 1] + 1) {
            // ──────────────────────────────────────────────
            // TRƯỜNG HỢP: Thanh liên tiếp
            // ──────────────────────────────────────────────
            // Ví dụ: bars[i-1] = 2, bars[i] = 3
            // → 3 === 2 + 1 → ĐÚNG, là liên tiếp!
            
            currentStreak++;  // Tăng độ dài chuỗi hiện tại
            // TẠI SAO tăng currentStreak?
            // - Mỗi lần gặp thanh liên tiếp, chuỗi dài thêm 1
            
            maxStreak = Math.max(maxStreak, currentStreak);
            // TẠI SAO dùng Math.max?
            // - Cập nhật chuỗi dài nhất nếu chuỗi hiện tại dài hơn
            // - Ví dụ: 
            //   * Trước đó tìm được chuỗi dài 2: [1,2]
            //   * Bây giờ tìm được chuỗi dài 3: [4,5,6]
            //   → maxStreak = max(2, 3) = 3
            
        } else {
            // ──────────────────────────────────────────────
            // TRƯỜNG HỢP: Không liên tiếp
            // ──────────────────────────────────────────────
            // Ví dụ: bars[i-1] = 3, bars[i] = 5
            // → 5 !== 3 + 1 → SAI, không liên tiếp!
            
            currentStreak = 1;
            // TẠI SAO reset về 1?
            // - Bắt đầu đếm chuỗi mới (chỉ có 1 phần tử hiện tại)
            // - Ví dụ: 
            //   * Đang đếm chuỗi [2,3] (currentStreak = 2)
            //   * Gặp số 5 (không liên tiếp với 3)
            //   → Bắt đầu chuỗi mới từ 5 (currentStreak = 1)
        }
    }
    
    // ──────────────────────────────────────────────────────
    // BƯỚC 4: Tính khoảng trống
    // ──────────────────────────────────────────────────────
    return maxStreak + 1;
    // TẠI SAO + 1?
    // - Công thức: Xóa k thanh liên tiếp → tạo k+1 ô
    // - Ví dụ:
    //   * maxStreak = 2 (xóa 2 thanh liên tiếp: [2,3])
    //   * Khoảng trống = 2 + 1 = 3 ô
    // 
    // Minh họa:
    //   Thanh: 1 ─ [2] ─ [3] ─ 4
    //   Ô:      [1]  [2]  [3]
    //   → 3 ô = 2 thanh xóa + 1
}

/**
 * ============================================================
 * HÀM 2: maximizeSquareHoleArea(n, m, hBars, vBars) - Hàm chính
 * ============================================================
 * 
 * 🎯 MỤC ĐÍCH: Tìm diện tích hình vuông lớn nhất
 * 
 * 📝 GIẢI THÍCH TỪNG BƯỚC:
 */
var maximizeSquareHoleArea = function(n, m, hBars, vBars) {
    // ──────────────────────────────────────────────────────
    // BƯỚC 1: Tìm khoảng trống lớn nhất theo chiều ngang
    // ──────────────────────────────────────────────────────
    const maxHorizontalGap = findMaxGap([...hBars]);
    // TẠI SAO dùng [...hBars] thay vì hBars?
    // - Tạo bản sao của mảng để không làm thay đổi mảng gốc
    // - Hàm findMaxGap() có dòng bars.sort() → sẽ sắp xếp mảng
    // - Nếu truyền trực tiếp hBars → mảng gốc bị thay đổi (side effect)
    // - Dùng spread operator [...] → tạo mảng mới, an toàn
    
    // Ví dụ:
    //   hBars = [3, 2, 1]
    //   findMaxGap([...hBars]) → sắp xếp bản sao → [1,2,3]
    //   hBars vẫn là [3, 2, 1] (không bị thay đổi)
    
    // ──────────────────────────────────────────────────────
    // BƯỚC 2: Tìm khoảng trống lớn nhất theo chiều dọc
    // ──────────────────────────────────────────────────────
    const maxVerticalGap = findMaxGap([...vBars]);
    // Tương tự như trên, tìm cho chiều dọc
    
    // ──────────────────────────────────────────────────────
    // BƯỚC 3: Tìm cạnh hình vuông
    // ──────────────────────────────────────────────────────
    const side = Math.min(maxHorizontalGap, maxVerticalGap);
    // TẠI SAO dùng Math.min?
    // - Hình vuông cần 2 cạnh BẰNG NHAU
    // - Nếu chiều ngang = 3, chiều dọc = 2
    //   → Hình vuông lớn nhất = 2×2 (không thể là 3×3 vì chiều dọc chỉ có 2)
    // 
    // Ví dụ:
    //   maxHorizontalGap = 5 (có thể tạo 5 ô ngang)
    //   maxVerticalGap = 3 (chỉ có thể tạo 3 ô dọc)
    //   → side = min(5, 3) = 3
    //   → Hình vuông 3×3 = 9 ô (không thể là 5×5)
    
    // ──────────────────────────────────────────────────────
    // BƯỚC 4: Tính diện tích
    // ──────────────────────────────────────────────────────
    return side * side;
    // TẠI SAO side * side?
    // - Diện tích hình vuông = cạnh × cạnh
    // - Ví dụ: cạnh = 3 → diện tích = 3 × 3 = 9
};

/**
 * ============================================================
 * HÀM 3: visualizeSolutionSimple() - Minh họa từng bước
 * ============================================================
 * 
 * 🎯 MỤC ĐÍCH: In ra từng bước giải để dễ hiểu
 * 
 * 📝 GIẢI THÍCH:
 */
function visualizeSolutionSimple(n, m, hBars, vBars) {
    // In header
    console.log("\n" + "=".repeat(60));
    console.log("📊 GIẢI BÀI TOÁN TỪNG BƯỚC");
    console.log("=".repeat(60));
    
    // ──────────────────────────────────────────────────────
    // In thông tin đầu vào
    // ──────────────────────────────────────────────────────
    console.log(`\n🔹 Thông tin đầu vào:`);
    console.log(`   - Lưới: ${n+2} thanh ngang × ${m+2} thanh dọc`);
    // TẠI SAO n+2 và m+2?
    // - n là số thanh ngang BÊN TRONG (không tính 2 thanh biên)
    // - m là số thanh dọc BÊN TRONG (không tính 2 thanh biên)
    // - Tổng = n + 2 (biên trên + biên dưới)
    // 
    // Ví dụ: n=2 → có 2 thanh trong + 2 thanh biên = 4 thanh
    
    console.log(`   - Thanh ngang có thể xóa: [${hBars.join(', ')}]`);
    console.log(`   - Thanh dọc có thể xóa: [${vBars.join(', ')}]`);
    // join(', ') → nối các phần tử bằng dấu phẩy
    // Ví dụ: [2,3] → "2, 3"
    
    // ──────────────────────────────────────────────────────
    // BƯỚC 1: Tìm khoảng trống theo chiều ngang
    // ──────────────────────────────────────────────────────
    const hGap = findMaxGap([...hBars]);
    const hStreak = hGap - 1;
    // hStreak = số thanh liên tiếp
    // hGap = khoảng trống (số ô)
    
    console.log(`\n🔹 BƯỚC 1: Tìm khoảng trống theo chiều DỌC (ngang)`);
    if (hBars.length === 0) {
        // Trường hợp đặc biệt: không có thanh nào để xóa
        console.log(`   - Không có thanh nào để xóa`);
        console.log(`   - Khoảng trống = 1 ô (mặc định)`);
    } else {
        const sorted = [...hBars].sort((a,b) => a-b);
        // TẠI SAO sort((a,b) => a-b)?
        // - Sắp xếp tăng dần
        // - a-b > 0 → a > b → đổi chỗ
        // - a-b < 0 → a < b → giữ nguyên
        // - Ví dụ: [3,1,2] → [1,2,3]
        
        console.log(`   - Thanh có thể xóa: [${sorted.join(', ')}]`);
        console.log(`   - Tìm chuỗi dài nhất các thanh LIÊN TIẾP...`);
        console.log(`   - Chuỗi dài nhất: ${hStreak} thanh liên tiếp`);
        console.log(`   - Khoảng trống = ${hStreak} + 1 = ${hGap} ô`);
    }
    
    // ──────────────────────────────────────────────────────
    // BƯỚC 2: Tìm khoảng trống theo chiều dọc
    // ──────────────────────────────────────────────────────
    const vGap = findMaxGap([...vBars]);
    const vStreak = vGap - 1;
    // Tương tự như BƯỚC 1, nhưng cho chiều dọc
    
    console.log(`\n🔹 BƯỚC 2: Tìm khoảng trống theo chiều NGANG (dọc)`);
    if (vBars.length === 0) {
        console.log(`   - Không có thanh nào để xóa`);
        console.log(`   - Khoảng trống = 1 ô (mặc định)`);
    } else {
        const sorted = [...vBars].sort((a,b) => a-b);
        console.log(`   - Thanh có thể xóa: [${sorted.join(', ')}]`);
        console.log(`   - Tìm chuỗi dài nhất các thanh LIÊN TIẾP...`);
        console.log(`   - Chuỗi dài nhất: ${vStreak} thanh liên tiếp`);
        console.log(`   - Khoảng trống = ${vStreak} + 1 = ${vGap} ô`);
    }
    
    // ──────────────────────────────────────────────────────
    // BƯỚC 3: Tính hình vuông lớn nhất
    // ──────────────────────────────────────────────────────
    const side = Math.min(hGap, vGap);
    const area = side * side;
    
    console.log(`\n🔹 BƯỚC 3: Tìm hình vuông lớn nhất`);
    console.log(`   - Chiều dọc: ${hGap} ô`);
    console.log(`   - Chiều ngang: ${vGap} ô`);
    console.log(`   - Hình vuông cần 2 cạnh BẰNG NHAU`);
    console.log(`   - Cạnh = min(${hGap}, ${vGap}) = ${side}`);
    console.log(`   - Diện tích = ${side} × ${side} = ${area}`);
    console.log("=".repeat(60) + "\n");
    // "=".repeat(60) → tạo chuỗi 60 dấu "="
    // → "============================================================"
}

// ============================================================
// 🧪 TEST CASES - CHẠY THỬ CÁC VÍ DỤ
// ============================================================

console.log("\n" + "=".repeat(60));
console.log("VÍ DỤ 1: n=2, m=1, hBars=[2,3], vBars=[2]");
console.log("=".repeat(60));
console.log("\n💡 GIẢI THÍCH:");
console.log("   - hBars=[2,3]: 2 thanh liên tiếp → gap = 2+1 = 3 ô");
console.log("   - vBars=[2]: 1 thanh → gap = 1+1 = 2 ô");
console.log("   - Hình vuông = min(3,2) = 2×2 = 4");
visualizeSolutionSimple(2, 1, [2, 3], [2]);
console.log("✅ Kết quả:", maximizeSquareHoleArea(2, 1, [2, 3], [2])); // Expected: 4

console.log("\n" + "=".repeat(60));
console.log("VÍ DỤ 2: n=1, m=1, hBars=[2], vBars=[2]");
console.log("=".repeat(60));
console.log("\n💡 GIẢI THÍCH:");
console.log("   - hBars=[2]: 1 thanh → gap = 1+1 = 2 ô");
console.log("   - vBars=[2]: 1 thanh → gap = 1+1 = 2 ô");
console.log("   - Hình vuông = min(2,2) = 2×2 = 4");
visualizeSolutionSimple(1, 1, [2], [2]);
console.log("✅ Kết quả:", maximizeSquareHoleArea(1, 1, [2], [2])); // Expected: 4

console.log("\n" + "=".repeat(60));
console.log("VÍ DỤ 3: n=2, m=3, hBars=[2,3], vBars=[2,3,4]");
console.log("=".repeat(60));
console.log("\n💡 GIẢI THÍCH:");
console.log("   - hBars=[2,3]: 2 thanh liên tiếp → gap = 2+1 = 3 ô");
console.log("   - vBars=[2,3,4]: 3 thanh liên tiếp → gap = 3+1 = 4 ô");
console.log("   - Hình vuông = min(3,4) = 3×3 = 9");
visualizeSolutionSimple(2, 3, [2, 3], [2, 3, 4]);
console.log("✅ Kết quả:", maximizeSquareHoleArea(2, 3, [2, 3], [2, 3, 4])); // Expected: 9

console.log("\n" + "=".repeat(60));
console.log("VÍ DỤ 4: n=1, m=1, hBars=[], vBars=[]");
console.log("=".repeat(60));
console.log("\n💡 GIẢI THÍCH:");
console.log("   - Không có thanh nào để xóa");
console.log("   - Khoảng trống mặc định = 1 ô mỗi chiều");
console.log("   - Hình vuông = min(1,1) = 1×1 = 1");
visualizeSolutionSimple(1, 1, [], []);
console.log("✅ Kết quả:", maximizeSquareHoleArea(1, 1, [], [])); // Expected: 1

console.log("\n" + "=".repeat(60));
console.log("VÍ DỤ 5: n=3, m=3, hBars=[1,2,4], vBars=[2,3]");
console.log("=".repeat(60));
console.log("\n💡 GIẢI THÍCH:");
console.log("   - hBars=[1,2,4]: có 2 chuỗi:");
console.log("     * Chuỗi 1: [1,2] (2 thanh liên tiếp) → gap = 3");
console.log("     * Chuỗi 2: [4] (1 thanh) → gap = 2");
console.log("     → Chọn chuỗi dài nhất: [1,2] → gap = 3");
console.log("   - vBars=[2,3]: 2 thanh liên tiếp → gap = 2+1 = 3 ô");
console.log("   - Hình vuông = min(3,3) = 3×3 = 9");
visualizeSolutionSimple(3, 3, [1, 2, 4], [2, 3]);
console.log("✅ Kết quả:", maximizeSquareHoleArea(3, 3, [1, 2, 4], [2, 3])); // Expected: 9

console.log("\n" + "=".repeat(60));
console.log("📚 TÓM TẮT CÁC KỸ THUẬT ĐÃ DÙNG:");
console.log("=".repeat(60));
console.log("1. Spread operator [...array] → Tạo bản sao mảng");
console.log("2. Array.sort((a,b) => a-b) → Sắp xếp tăng dần");
console.log("3. Math.max(a, b) → Tìm giá trị lớn nhất");
console.log("4. Math.min(a, b) → Tìm giá trị nhỏ nhất");
console.log("5. Array.join(', ') → Nối mảng thành chuỗi");
console.log("6. String.repeat(n) → Lặp lại chuỗi n lần");
console.log("7. Set → Kiểm tra phần tử có tồn tại (O(1))");
console.log("=".repeat(60));
