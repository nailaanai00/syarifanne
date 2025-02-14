// Fungsi untuk mengambil parameter dari URL
function getParameterByName(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

// Ambil parameter 'nama' dari URL
const namaTamu = getParameterByName('nama');

// Tampilkan nama tamu di elemen h2
if (namaTamu) {
    document.querySelector('#hero h2').innerText = namaTamu;
} else {
    // Jika tidak ada parameter 'nama', tampilkan 'Tamu Undangan'
    document.querySelector('#hero h2').innerText = 'Tamu Undangan';
}


document.getElementById('openInvitationBtn').addEventListener('click', function(event) {
    event.preventDefault(); // Mencegah scroll otomatis ke bagian undangan
    let heroSection = document.getElementById('hero');
    let coverSection = document.getElementById('cover');

    // Menambahkan efek fade-out pada hero section
    heroSection.style.opacity = '0';

    setTimeout(function() {
        heroSection.style.display = 'none'; // Sembunyikan hero setelah fade-out
        coverSection.style.display = 'block'; // Pastikan cover muncul
        coverSection.classList.add('fade-in'); // Tambahkan efek fade-in
        document.body.style.overflow = 'auto'; // Aktifkan scroll
    }, 1000); // Sesuai durasi efek fade-out

    sessionStorage.setItem('scrolled', 'true'); // Tandai bahwa user sudah berpindah ke cover
});

window.onload = function() {
    let heroSection = document.getElementById('hero');
    let coverSection = document.getElementById('cover');

    if (sessionStorage.getItem('scrolled')) {
        // Pastikan kembali ke hero section
        heroSection.style.display = 'block'; 
        heroSection.style.opacity = '1';
        coverSection.style.display = 'none'; 
        coverSection.classList.remove('fade-in');

        // Pastikan scroll tidak aktif
        document.body.style.overflow = 'hidden'; 

        // Menambahkan delay agar animasi selesai sebelum scroll
        setTimeout(function() {
            window.scrollTo(0, 0); 
        }, 500); // Berikan delay sedikit setelah perubahan tampilan

        // Reset sessionStorage setelah memastikan perubahan tampilan
        sessionStorage.clear();
    } else {
        document.body.style.overflow = 'hidden';
        window.scrollTo(0, 0);
    }
};

// Fungsi untuk membuka modal dengan gambar yang diklik
function openModal(imageSrc) {
    var modal = document.getElementById("imageModal");
    var modalImage = document.getElementById("modalImage");
    var caption = document.getElementById("caption");

    modal.style.display = "block"; // Menampilkan modal
    modalImage.src = imageSrc; // Menampilkan gambar yang diklik
    caption.innerHTML = altText || ""; // Menggunakan alt dari gambar jika ada
}

// Fungsi untuk menutup modal
function closeModal() {
    var modal = document.getElementById("imageModal");
    modal.style.display = "none"; // Menyembunyikan modal
}

document.getElementById("toggleButton").addEventListener("click", function() {
    const cardWrapper = document.querySelector(".card-wrapper");
    const cardContainer = document.querySelector(".card-container");
    const cards = document.querySelectorAll(".card");
    const button = document.getElementById("toggleButton");

    if (cardWrapper.classList.contains("show-wrapper")) {
        // Menutup kartu
        cardContainer.classList.remove("show-container");
        cards.forEach(card => card.classList.remove("show"));
        setTimeout(() => {
            cardWrapper.classList.remove("show-wrapper");
            cardWrapper.style.height = "0px";
            button.classList.remove("active"); // Ubah warna kembali
        }, 400);
    } else {
        // Membuka kartu
        cardWrapper.classList.add("show-wrapper");
        cardWrapper.style.height = "auto";
        setTimeout(() => {
            cardContainer.classList.add("show-container");
            cards.forEach(card => card.classList.add("show"));
            button.classList.add("active"); // Ubah warna tombol
        }, 100);
    }
});


document.addEventListener("DOMContentLoaded", function () {
    document.querySelector(".submit-btn").addEventListener("click", function () {
        let name = document.getElementById("name").value;
        let message = document.getElementById("message").value;
        let attendance = document.getElementById("attendance").value;

        if (name === "" || message === "" || attendance === "") {
            alert("Harap isi semua kolom!");
            return;
        }

        let formData = new FormData();
        formData.append("name", name);
        formData.append("message", message);
        formData.append("attendance", attendance);

        fetch("submit.php", {
            method: "POST",
            body: formData
        })
        .then(response => response.text())
        .then(data => {
            alert(data);
            loadComments(); // Memuat ulang daftar komentar setelah dikirim
            document.getElementById("name").value = "";
            document.getElementById("message").value = "";
            document.getElementById("attendance").value = "";
        })
        .catch(error => console.error("Error:", error));
    });

    function loadComments() {
        fetch("get_comments.php")
            .then(response => response.json())
            .then(data => {
                let commentsDiv = document.getElementById("comments");
                commentsDiv.innerHTML = "";
                data.forEach(comment => {
                    let commentBox = document.createElement("div");
                    commentBox.classList.add("comment-box");
                    commentBox.innerHTML = `
                        <h4>${comment.name} ❤️</h4>
                        <p>${comment.message}</p>
                        <p><strong>Konfirmasi:</strong> ${comment.attendance}</p>
                        <p class="timestamp">${comment.created_at}</p>
                    `;
                    commentsDiv.prepend(commentBox);
                });
            })
            .catch(error => console.error("Error:", error));
    }

    loadComments(); // Muat komentar saat halaman pertama kali dibuka
});



//EFEK TRANSISI
//stagger
document.addEventListener("DOMContentLoaded", function () {
    const elements = document.querySelectorAll(".stagger-text");
        
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add("show");
                }, index * 200); // Efek delay bertahap
            } else {
                entry.target.classList.remove("show");
            }
        });
     }, { threshold: 0.2 });
        
    elements.forEach((el) => observer.observe(el));
});

//bouncy
document.addEventListener("DOMContentLoaded", function () {
    const elements = document.querySelectorAll(".bouncy-text");

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
                entry.target.classList.remove("hide");
            } else {
                entry.target.classList.remove("show");
                entry.target.classList.add("hide");
            }
        });
    }, { threshold: 0.2 }); // Elemen hanya butuh terlihat 20% untuk memulai animasi

    elements.forEach((el) => observer.observe(el));
});

//fade in + slide up
document.addEventListener("DOMContentLoaded", function () {
    const elements = document.querySelectorAll(".fading-text");

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
                entry.target.classList.remove("hide");
            } else {
                entry.target.classList.remove("show");
                entry.target.classList.add("hide");
            }
        });
    }, { threshold: 0.2 });

    elements.forEach((el) => observer.observe(el));
});
