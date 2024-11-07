let boxes = document.querySelectorAll(".box");
let resetbutton = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg1 = document.querySelector("#msg");

let turn0 = true;
let count = 0; // Initialize count to track the number of moves

const winnumber = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
];

boxes.forEach((box) => {
    box.addEventListener("click", () => {

        if (box.innerText !== "") return; // Prevent marking already filled boxes

        if (turn0) {
            box.innerText = "0";
            turn0 = false;
        } else {
            box.innerText = "X";
            turn0 = true;
        }
        count++;
        box.disabled = true; // Disable the clicked box
        checkwinner();
    });
});

const checkwinner = () => {
    for (let pattern of winnumber) {
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if (count === 9) {
            showDraw();
            return; // Exit after all cells are filled and no winner
        }

        if (pos1Val !== "" && pos2Val !== "" && pos3Val !== "") {
            if (pos1Val === pos2Val && pos2Val === pos3Val) {
                console.log("winner", pos1Val);
                showWinner(pos1Val);
                desable();
                return; // Exit after finding a winner
            }
        }
    }


};

const showWinner = (pos1Val) => {
    msg1.innerText = "";
    msg1.innerHTML = "Winner is: " + pos1Val;
    msgContainer.classList.remove("hide");
}

const showDraw = () => {

    msg1.innerHTML = "It's a draw!";
    msgContainer.classList.remove("hide");
}

const reset = () => {
    turn0 = true;
    count = 0;
    enable();
    msgContainer.classList.add("hide");
};

const desable = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
};

const enable = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
    }
};

newGameBtn.addEventListener("click", reset);
resetbutton.addEventListener("click", reset);