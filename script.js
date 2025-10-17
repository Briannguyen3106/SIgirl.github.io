// Tạo hiệu ứng hoa rơi
function createFlowers() {
    const flowerBg = document.getElementById('flowerBg');
    const flowers = ['🌸', '🌺', '🌼', '🌷', '💐', '🌹'];
    
    for (let i = 0; i < 15; i++) {
        const flower = document.createElement('div');
        flower.className = 'flower';
        flower.textContent = flowers[Math.floor(Math.random() * flowers.length)];
        flower.style.left = Math.random() * 100 + '%';
        flower.style.animationDuration = (Math.random() * 10 + 10) + 's';
        flower.style.animationDelay = Math.random() * 5 + 's';
        flowerBg.appendChild(flower);
    }
}

createFlowers();

// Xử lý click vào wish card
const wishCards = document.querySelectorAll('.wish-card');

wishCards.forEach(card => {
    card.addEventListener('click', function(e) {
        // Nếu click vào nút đóng thì không làm gì
        if (e.target.classList.contains('close-btn')) {
            return;
        }

        // Đóng tất cả các card khác
        wishCards.forEach(otherCard => {
            if (otherCard !== card) {
                otherCard.classList.remove('expanded');
                const content = otherCard.querySelector('.wish-content');
                if (content) {
                    content.remove();
                }
            }
        });

        // Toggle card hiện tại
        if (card.classList.contains('expanded')) {
            card.classList.remove('expanded');
            const content = card.querySelector('.wish-content');
            if (content) {
                content.remove();
            }
        } else {
            card.classList.add('expanded');
            
            // Tạo nội dung lời chúc
            const wishText = card.getAttribute('data-wish');
            const senderName = card.getAttribute('data-sender');
            
            const wishContent = document.createElement('div');
            wishContent.className = 'wish-content';
            wishContent.innerHTML = `
                <p class="wish-text">"${wishText}"</p>
                <p class="wish-sender">- ${senderName}</p>
                <button class="close-btn">Đóng lại</button>
            `;
            
            card.appendChild(wishContent);
            
            // Xử lý nút đóng
            const closeBtn = wishContent.querySelector('.close-btn');
            closeBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                card.classList.remove('expanded');
                wishContent.remove();
            });

            // Cuộn đến card được mở
            setTimeout(() => {
                card.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 100);
        }
    });
});