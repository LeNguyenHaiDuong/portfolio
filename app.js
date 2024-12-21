AOS.init({
    offset: 1
});

// JavaScript để chuyển đổi giữa các tab
const tabLinks = document.querySelectorAll('.tab-link');
const tabSections = document.querySelectorAll('.tab-section');

tabLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Ẩn tất cả các section
        tabSections.forEach(section => section.style.display = 'none');
        
        // Xóa class 'active' khỏi tất cả các liên kết
        tabLinks.forEach(link => link.classList.remove('active'));
        
        // Hiển thị section của tab đã nhấp
        const tabId = link.getAttribute('data-tab');
        const activeSection = document.querySelector(`#${tabId}`); // Sửa lỗi tại đây
        activeSection.style.display = 'block';
        
        // Thêm class 'active' vào liên kết tab đang được chọn
        link.classList.add('active');
    });
});



// Data for each card
function showCards(category) {
    // Card data for each button
    const cardData = {
        "Programming Language": [
            { img: "technical/python.svg", text: "Python", pos: 1 },
            { img: "technical/pyspark.png", text: "PySpark", pos: 2 },
            { img: "technical/sql.svg", text: "SQL", pos: 3 },
            { img: "technical/java.svg", text: "Java", pos: 4 },
            { img: "technical/c++.svg", text: "C/C++", pos: 5 },
            { img: "technical/julia.svg", text: "Julia", pos: 6 }
        ],
        "Analysis Libraries": [
            { img: "technical/pandas.svg", text: "Pandas", pos: 1 },
            { img: "technical/numpy.svg", text: "NumPy", pos: 2 },
            { img: "technical/matplotlib.svg", text: "Matplotlib", pos: 3 },
            { img: "technical/seaborn.png", text: "Seaborn", pos: 4 },
            { img: "technical/plotly.png", text: "Plotly", pos: 5 },
            { img: "technical/streamlit.png", text: "Streamlit", pos: 6 }
        ],
        "Machine Learning Libraries": [
            { img: "technical/scikit-learn.svg", text: "Scikit-learn", pos: 1 },
            { img: "technical/tensorflow.png", text: "TensorFlow", pos: 2 },
        ],
        "Tools": [
            { img: "technical/google-colab.png", text: "Google Colab", pos: 1 },
            { img: "technical/github.svg", text: "Github", pos: 2 },
            { img: "technical/jupyter.svg", text: "Jupyter Notebook", pos: 3 },
            { img: "technical/tableau.svg", text: "Tableau", pos: 4 },
            { img: "technical/vscode.svg", text: "VS Code", pos: 5 }
        ],
        "Big Data Framework": [
            { img: "technical/hadoop.svg", text: "Hadoop", pos: 1 },
            { img: "technical/spark.png", text: "Spark", pos: 2 },
            { img: "technical/kafka.svg", text: "Kafka", pos: 3 }
        ],
        "Research Topic": [
            { img: "technical/data_mining.svg", text: "Data Mining", pos: 1 },
            { img: "technical/nlp.png", text: "Natural Language Processing", pos: 2 },
            { img: "technical/causal_inference.png", text: "Causal Inference", pos: 3 }
        ]
    };


    // Lấy phần tử .slider
    const slider = document.querySelector(".slider");
    slider.innerHTML = ""; // Xóa nội dung cũ trong slider

    // Tạo phần tử list
    const list = document.createElement("div");
    list.classList.add("list");

    // Cập nhật số lượng thẻ
    slider.style.setProperty("--quantity", cardData[category].length);

    // Tạo thẻ .item và thêm vào list
    cardData[category].forEach((card) => {
        const item = document.createElement("div");
        item.classList.add("item");
        item.style.setProperty("--position", card.pos); // Gán vị trí thẻ
        item.innerHTML = `
            <img src="${card.img}" alt="${card.text}">
            <p>${card.text}</p>
        `;
        list.appendChild(item);
    });

    // Thêm list vào slider
    slider.appendChild(list);
    


    const items = document.querySelectorAll('.slider .item');
    
    // Khi một item được hover
    items.forEach(item => {
        item.addEventListener('mouseenter', () => {
            slider.classList.add('hovering'); // Thêm lớp 'hovering' vào slider
        });

        item.addEventListener('mouseleave', () => {
            slider.classList.remove('hovering'); // Loại bỏ lớp 'hovering' khi không còn hover
        });
    });
}





// DOM Elements
const certList = document.querySelector(".certs .list"); // Danh sách các item
const certItems = document.querySelectorAll(".certs .list .item"); // Các item
const prevButton = document.querySelector(".buttons .prev"); // Nút lùi
const nextButton = document.querySelector(".buttons .next"); // Nút tiến

// Configurations
const itemsPerPage = 3; // Số lượng items hiển thị (có thể thay đổi)
let currentIndex = 0; // Vị trí bắt đầu

const itemWidth = 230; // Chiều rộng mỗi item
const gap = 30; // Khoảng cách giữa các item
const totalWidthPerItem = itemWidth + gap; // Tổng chiều rộng của mỗi item cộng với khoảng cách

// Truy cập phần tử có id "dynamicBackground"
const backgroundElement = document.getElementById("dynamicBackground");

const imageList = [
    'background/morning.jpg', 
    'background/afternoon.jpg',
    'background/night.jpg'    
]; // Thay đổi ảnh nền

// Function: Cập nhật danh sách hiển thị
function updateCertList() {
    // Tính toán vị trí translateX dựa trên currentIndex
    const translateX = -(currentIndex * totalWidthPerItem * itemsPerPage);
    certList.style.transition = "transform 0.5s ease"; // Thêm hiệu ứng mượt mà
    certList.style.transform = `translateX(${translateX}px)`;

    // Cập nhật nền với hiệu ứng chuyển
    backgroundElement.style.transition = "opacity 1s ease, filter 1s ease"; // Thêm hiệu ứng mờ
    backgroundElement.style.opacity = 0.6; 
    backgroundElement.style.filter = "blur(25px)";
    setTimeout(() => {
        backgroundElement.style.backgroundImage = `url(${imageList[currentIndex % imageList.length]})`;
        backgroundElement.style.transition = "opacity 1s ease, filter 1s ease";
        backgroundElement.style.opacity = 1;
        backgroundElement.style.filter = "blur(0px)";
    }, 600);
    
    // Disable nút nếu cần
    prevButton.disabled = currentIndex === 0;
    nextButton.disabled = currentIndex >= Math.ceil(certItems.length / itemsPerPage) - 1;
}

// Event: Nút lùi
prevButton.addEventListener("click", () => {
    if (currentIndex > 0) {
        currentIndex--;
        updateCertList();
    }
});

// Event: Nút tiến
nextButton.addEventListener("click", () => {
    if (currentIndex < Math.ceil(certItems.length / itemsPerPage) - 1) {
        currentIndex++;
        updateCertList();
    }
});

// Khởi tạo
updateCertList();
