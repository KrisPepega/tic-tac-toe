class Game {
    #game_grid = [[-1,-1,-1],
                  [-1,-1,-1],
                  [-1,-1,-1]]

    #game_type = -1
    #winner = -1
    #current_turn = true

    game_move(g_id){
        if(this.#game_type === -1){
            alert("please select gamemode!")
        }
        else if(this.#game_type === 0){
            alert("WIP")
            this.set_game_type(-1)
        }
        else{
            if(this.#check_valid_move(g_id)) {
                if(this.#current_turn) {
                    document.getElementById(g_id).innerHTML = "X"
                    this.#update_game_grid(g_id)
                }
                else {
                    document.getElementById(g_id).innerHTML = "O"
                    this.#update_game_grid(g_id)
                }
                if(this.#evaluate_win_cond()){
                    if(this.#winner) {
                        alert(`Player 1 has won!`)
                    }
                    else {
                        alert(`Player 2 has won!`)
                    }
                    this.#reset_game()
                }
                if(this.#evaluate_draw()){
                    alert("Game is a draw!")
                    this.#reset_game()
                }
                else {
                    this.#current_turn = !this.#current_turn
                }
            }
            else {
                alert("Invalid move!")
            }
        }
    }

    set_game_type(input){
        if(input == -1)document.getElementsByTagName("h1")[0].innerHTML = "Please select gamemode!"
        if(input == 0)document.getElementsByTagName("h1")[0].innerHTML = "1 player mode selected"
        if(input == 1)document.getElementsByTagName("h1")[0].innerHTML = "2 player mode selected"
        this.#game_type = input
        this.#reset_game()
    }

    #update_game_grid(g_id = ""){
        if(g_id === "")alert("error: invalid grid_id")
        else {
            let i0 = g_id.charAt(1)
            let i1 = g_id.charAt(2)
            this.#game_grid[i0][i1] = +this.#current_turn
        }
    }

    #check_valid_move(g_id = ""){
        if(g_id === "")alert("error: invalid grid_id")
        else{
            let i0 = g_id.charAt(1)
            let i1 = g_id.charAt(2)
            let result = false
            if(this.#game_grid[i0][i1] === -1) result = true
            return result
        }
    }

    #reset_game(){
        this.#game_grid = [[-1,-1,-1],
                           [-1,-1,-1],
                           [-1,-1,-1]]

        for(let i = 0; i < 3; i++){
            for(let j = 0; j < 3; j++){
                document.getElementById(`g${i}${j}`).innerHTML = ""
            }
        }

        this.#current_turn = true
    }

    #evaluate_win_cond(){
        let result = false
        for(let i = 0; i < 2; i++){
            for(let j = 0; j < 3; j++){
                if( this.#game_grid[j].every((cur_val)=>cur_val === i) ||
                    (this.#game_grid[0][j] === i && this.#game_grid[1][j] === i && this.#game_grid[2][j] === i) ||
                    (this.#game_grid[0][0] === i && this.#game_grid[1][1] === i && this.#game_grid[2][2] === i) ||
                    (this.#game_grid[2][0] === i && this.#game_grid[1][1] === i && this.#game_grid[0][2] === i)) {
                    this.#winner = i
                    result = true
                }
            }
        }
        return result
    }
    
    #evaluate_draw(){
        let result = false
        if(this.#game_grid[0].indexOf(-1) === -1 &&
           this.#game_grid[1].indexOf(-1) === -1 &&
           this.#game_grid[2].indexOf(-1) === -1){
            result = true
           }
        return result
    }
}

const game = new Game


document.getElementById("btn_1play").addEventListener("click", ()=>{game.set_game_type(0)})
document.getElementById("btn_2play").addEventListener("click", ()=>{game.set_game_type(1)})

document.getElementById("g00").addEventListener("click", ()=>{game.game_move("g00")})
document.getElementById("g01").addEventListener("click", ()=>{game.game_move("g01")})
document.getElementById("g02").addEventListener("click", ()=>{game.game_move("g02")})

document.getElementById("g10").addEventListener("click", ()=>{game.game_move("g10")})
document.getElementById("g11").addEventListener("click", ()=>{game.game_move("g11")})
document.getElementById("g12").addEventListener("click", ()=>{game.game_move("g12")})

document.getElementById("g20").addEventListener("click", ()=>{game.game_move("g20")})
document.getElementById("g21").addEventListener("click", ()=>{game.game_move("g21")})
document.getElementById("g22").addEventListener("click", ()=>{game.game_move("g22")})