// ==========================================
// DỮ LIỆU CHIẾN DỊCH SẮP TRIỂN KHAI
// ==========================================

const campaigns = [
  {
    id: "01",
    type: "upcoming",
    date: "12.10.2026",
    tag: "Thiện nguyện",
    title: "Áo ấm trao tay",
    description:
      "Chương trình quyên góp và trao tặng vật phẩm thiết yếu đến những hoàn cảnh còn khó khăn. Thành viên có thể đồng hành ở các nhóm hậu cần, truyền thông và tổ chức.",
    tags: ["Quyên góp", "Cộng đồng", "Tình nguyện"]
  },
  {
    id: "02",
    type: "upcoming",
    date: "24.10.2026",
    tag: "Giáo dục",
    title: "Cùng em đến trường",
    description:
      "Hoạt động hỗ trợ học tập và tạo không gian vui chơi, giao lưu cho trẻ em. Chương trình cần tình nguyện viên hỗ trợ tổ chức và hướng dẫn hoạt động.",
    tags: ["Trẻ em", "Giáo dục", "Kết nối"]
  },
  {
    id: "03",
    type: "upcoming",
    date: "08.11.2026",
    tag: "Môi trường",
    title: "Một ngày xanh",
    description:
      "Chiến dịch nâng cao ý thức bảo vệ môi trường thông qua hoạt động làm sạch không gian công cộng và truyền thông lối sống xanh.",
    tags: ["Môi trường", "Truyền thông", "Hành động"]
  }
];


// ==========================================
// DỮ LIỆU CÁC CHIẾN DỊCH ĐÃ THỰC HIỆN
// ==========================================

const highlights = [
  {
    id: "04",
    type: "highlight",
    date: "Hoạt động tiêu biểu",
    tag: "Cộng đồng",
    title: "Kết nối yêu thương",
    description:
      "Những buổi thăm hỏi, trao quà và sẻ chia đã tạo nên nhiều khoảnh khắc đáng nhớ giữa các thành viên và cộng đồng.",
    image: "assets/images/ket-noi-yeu-thuong.jpg",
    tags: ["Chia sẻ", "Đồng hành"]
  },
  {
    id: "05",
    type: "highlight",
    date: "Hoạt động tiêu biểu",
    tag: "Sinh viên",
    title: "Ngày hội tình nguyện",
    description:
      "Không gian để sinh viên gặp gỡ, học hỏi kỹ năng và cùng nhau thực hiện các hoạt động có ích.",
    image: "assets/images/ngay-hoi-tinh-nguyen.jpg",
    tags: ["Sinh viên", "Kỹ năng"]
  }
];


// ==========================================
// KẾT NỐI HTML
// ==========================================

const upcomingGrid = document.querySelector("#upcomingGrid");
const highlightGrid = document.querySelector("#highlightGrid");


// ==========================================
// TẠO CARD CHIẾN DỊCH
// ==========================================

function campaignCard(item, index, featured = false) {
  // TÍNH NĂNG MỚI: campaign sắp tới dùng CTA đăng ký thay vì mở modal.
  const isUpcoming = item.type === "upcoming";

  return `
    <article
      class="${featured ? "highlight-card featured" : "campaign-card"} reveal"
    >

      ${
        item.image
          ? `
            <div class="campaign-image-wrapper">
              <img
                src="${item.image}"
                alt="${item.title}"
                class="campaign-image"
                loading="lazy"
              >
            </div>
          `
          : ""
      }

      <div class="campaign-card-content">

        <div class="card-top">
          <span class="card-index">${item.id}</span>
          <span class="tag">${item.tag}</span>
        </div>

        <div class="card-date">${item.date}</div>

        <h3>${item.title}</h3>

        <p>${item.description}</p>

      </div>

      <button
        class="card-button"
        ${isUpcoming ? `data-register-campaign-id="${item.id}"` : `data-campaign-id="${item.id}"`}
      >
        ${isUpcoming ? "Đăng ký ↗" : "Xem chi tiết ↗"}
      </button>

    </article>
  `;
}


// ==========================================
// HIỂN THỊ DANH SÁCH
// ==========================================

upcomingGrid.innerHTML = campaigns
  .map(item => campaignCard(item))
  .join("");

highlightGrid.innerHTML = highlights
  .map((item, index) => campaignCard(item, index, index === 0))
  .join("");


// ==========================================
// MODAL CHI TIẾT CHIẾN DỊCH
// ==========================================

const allCampaigns = [...campaigns, ...highlights];

const modal = document.querySelector("#campaignModal");
const modalTitle = document.querySelector("#modalTitle");
const modalDate = document.querySelector("#modalDate");
const modalDescription = document.querySelector("#modalDescription");
const modalTags = document.querySelector("#modalTags");
const modalType = document.querySelector("#modalType");


// Mở modal
function openModal(id) {
  const item = allCampaigns.find(
    campaign => campaign.id === id
  );

  if (!item) return;

  modalTitle.textContent = item.title;
  modalDate.textContent = item.date;
  modalDescription.textContent = item.description;

  modalType.innerHTML = `
    <span></span>
    ${
      item.type === "upcoming"
        ? "Chiến dịch sắp tới"
        : "Chiến dịch đã thực hiện"
    }
  `;

  modalTags.innerHTML = item.tags
    .map(tag => `<span class="tag">${tag}</span>`)
    .join("");

  modal.classList.add("active");
  modal.setAttribute("aria-hidden", "false");

  document.body.style.overflow = "hidden";
}


// Đóng modal
function closeModal() {
  modal.classList.remove("active");
  modal.setAttribute("aria-hidden", "true");

  document.body.style.overflow = "";
}


// ==========================================
// XỬ LÝ CLICK
// ==========================================

document.addEventListener("click", event => {
  // TÍNH NĂNG MỚI: ẩn card đã chọn và đưa người dùng tới form đăng ký.
  const registerButton = event.target.closest("[data-register-campaign-id]");

  if (registerButton) {
    const campaign = campaigns.find(
      item => item.id === registerButton.dataset.registerCampaignId
    );
    const card = registerButton.closest(".campaign-card");
    const joinSection = document.querySelector("#join");
    const interestInput = document.querySelector('input[name="interest"]');

    if (campaign && card) {
      card.hidden = true;

      if (interestInput && !interestInput.value) {
        interestInput.value = campaign.title;
      }

      joinSection.scrollIntoView({ behavior: "smooth" });
      document.querySelector('input[name="name"]').focus({ preventScroll: true });
    }

    return;
  }

  const button = event.target.closest("[data-campaign-id]");

  if (button) {
    openModal(button.dataset.campaignId);
  }

  if (event.target.matches("[data-close-modal]")) {
    closeModal();
  }
});


// Nút đóng modal
document
  .querySelector("#modalClose")
  .addEventListener("click", closeModal);


// Đóng modal bằng phím ESC
document.addEventListener("keydown", event => {
  if (event.key === "Escape") {
    closeModal();
  }
});


// ==========================================
// MENU MOBILE
// ==========================================

const menuToggle = document.querySelector("#menuToggle");
const navLinks = document.querySelector("#navLinks");

menuToggle.addEventListener("click", () => {
  const open = navLinks.classList.toggle("open");

  menuToggle.setAttribute(
    "aria-expanded",
    String(open)
  );
});


// Đóng menu sau khi chọn liên kết
document
  .querySelectorAll(".nav-links a")
  .forEach(link => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");

      menuToggle.setAttribute(
        "aria-expanded",
        "false"
      );
    });
  });


// ==========================================
// HIỆU ỨNG SCROLL REVEAL
// ==========================================

const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");

        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.12
  }
);


// Theo dõi các phần tử có class reveal
document
  .querySelectorAll(".reveal")
  .forEach(element => {
    observer.observe(element);
  });


// ==========================================
// FORM ĐĂNG KÝ
// ==========================================

document
  .querySelector("#joinForm")
  .addEventListener("submit", event => {
    event.preventDefault();

    const form = event.currentTarget;
    const message = document.querySelector("#formMessage");

    const data = Object.fromEntries(
      new FormData(form).entries()
    );

    if (
      !data.name ||
      !data.email ||
      !data.studentId ||
      !data.interest
    ) {
      message.textContent =
        "Vui lòng điền đầy đủ thông tin.";

      return;
    }

    message.textContent =
      "Đăng ký đã được ghi nhận trên bản demo. Hãy kết nối form với backend để lưu dữ liệu thực tế.";

    form.reset();
  });