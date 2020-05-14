let grade;
let colunas;
let linhas;
let resolucao = 2;

function criaArray2D(colunas, linhas) {
    let arr = new Array(colunas);
    for (let i = 0; i < arr.length; i++) {
        arr[i] = new Array(linhas);
    }
    return arr;
}


function setup() {
    createCanvas(900, 600);
    colunas = width / resolucao;
    linhas = height / resolucao;

    grade = criaArray2D(colunas, linhas);
    for (let i = 0; i < colunas; i++) {
        for (let j = 0; j < linhas; j++) {
            grade[i][j] = floor(random(2));
        }
    }
}

function draw() {
    background(0);

    for (let i = 0; i < colunas; i++) {
        for (let j = 0; j < colunas; j++) {
            let x = i * resolucao;
            let y = j * resolucao;
            if (grade[i][j] === 1) {
                fill(255);
                stroke(0);
                rect(x, y, resolucao - 1, resolucao - 1);
            }
        }
    }
    let next = criaArray2D(colunas, linhas);
    for (let i = 0; i < colunas; i++) {
        for (let j = 0; j < linhas; j++) {
            let state = grade[i][j];

            let soma = 0;
            let vizinhos = contaVizinhos(grade, i, j);
            if (state == 0 && vizinhos == 3) {
                next[i][j] = 1;
            } else if (state == 1 && (vizinhos < 2 || vizinhos > 3)) {
                next[i][j] = 0;
            } else {
                next[i][j] = state;
            }

        }
    }

    grade = next
}

function contaVizinhos(grade, x, y) {
    let soma = 0;
    for (let i = -1; i < 2; i++) {
        for (let j = -1; j < 2; j++) {
            let coluna = (x + i + colunas) % colunas;
            let linha = (y + j + linhas) % linhas;
            soma += grade[coluna][linha];
        }
    }
    soma -= grade[x][y];
    return soma;
}