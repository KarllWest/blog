document.addEventListener("DOMContentLoaded", () => {
    const boxes = document.querySelectorAll(".expandable-box");

    boxes.forEach(box => {
        box.addEventListener("click", () => {
            if (box.classList.contains("expanded")) {
                box.classList.remove("expanded");
            } else {
                document.querySelectorAll(".expanded").forEach(expandedBox => {
                    expandedBox.classList.remove("expanded");
                });
                box.classList.add("expanded");
            }
        });
    });
});

const style = document.createElement("style");
style.innerHTML = `
    .expandable-box {
        position: relative;
        width: 200px;
        height: 200px;
        overflow: hidden;
        transition: all 0.5s ease-in-out;
        cursor: pointer;
        border-radius: 10px;
    }

    .expandable-box img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.5s ease-in-out;
    }

    .expandable-box.expanded {
        width: 400px;
        height: 400px;
    }

    .expandable-box.expanded img {
        transform: scale(1.2);
    }
`;
document.head.appendChild(style);
