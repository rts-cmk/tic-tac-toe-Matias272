import { useState } from "react";
import Board from "./Board";
//
const PLAYER_X = "X";
const PLAYER_O = "O";
export default function TicTacToe() {
    const [tiles, setTiles] = useState(Array(9).fill(null))
    const [playerTurn, setPlayerTurn] = useState(PLAYER_X)

    const handleTileClick = (i) => {
        if(tiles[i] !== null){
            return;

        }
        const newTiles = [...tiles];
        newTiles[i] = playerTurn;
        setTiles(newTiles)
        if(playerTurn === PLAYER_X){
            setPlayerTurn(PLAYER_O)
        }
        else{
            setPlayerTurn(PLAYER_X)
        }
        
    } 
    return (
        <>
        <h1>Tic Tac Toe</h1>
        <Board playerTurn={playerTurn} tiles={tiles} onTileClick={handleTileClick } />
        </>
    )
}