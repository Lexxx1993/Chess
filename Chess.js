var bp;
var bK;
var bB;
var bR;
var bQ;
var bKp;	
var wp;
var wK;
var wB;
var wR;
var wQ;
var wKp;
bp = "<img src='./img/bp.png' width='60' height='60' color='black' type='Pawn' />",
bK = "<img src='./img/bK.png' width='60' height='60' color='black' type='Knight' />",
bB = "<img src='./img/bB.png' width='60' height='60' color='black' type='Bishop' />",
bR = "<img src='./img/bR.png' width='60' height='60'' color='black' type='Rook' />",
bQ = "<img src='./img/bQ.png' width='60' height='60' color='black' type='Queen' />",
bKp = "<img src='./img/bKp.png' width='60' height='60' color='black' type='King' />",		
wp = "<img src='./img/wp.png' width='60' height='60' color='white' type='Pawn' />",
wK = "<img src='./img/wK.png' width='60' height='60' color='white' type='Knight' />",
wB = "<img src='./img/wB.png' width='60' height='60' color='white' type='Bishop' />",
wR = "<img src='./img/wR.png' width='60' height='60' color='white' type='Rook' />",
wQ = "<img src='./img/wQ.png' width='60' height='60' color='white' type='Queen' />",
wKp = "<img src='./img/wKp.png' width='60' height='60' color='white' type='King' />"
selected = false;
function CreateBoard (Height, Width) {
	var board = $('#Board');
	for (var i = 0; i < Height; i++) {
		for (var j = 0; j < Width; j++) {
			if ((i % 2 == 0 && j % 2 == 0) || (i % 2 != 0 && j % 2 != 0)) {
				board.append ($('<div class="WhiteCell"> </div>').attr("x",i+1).attr("y",j+1));
			} else {
				board.append ($('<div class="BlackCell"> </div>').attr("x",i+1).attr("y",j+1));
            }
		}
	}
}
console.log("CreateBoard");
function AddShapes () { 
    Cell = $(".WhiteCell,.BlackCell");
    for (var i = 1; i < 9; i++) {
        for (var j = 1; j < 9; j++) {
            if (i == 2) {
                InsertShape(i,j,bp);
            }
            else if (i == 7) {
                InsertShape (i,j,wp);
            }
            else if (i == 1) {
                if (j == 1 || j == 8)  {
                    InsertShape(i,j, bR);
                }
                else if (j == 2 || j == 7) {
                    InsertShape(i,j,bK);
                }
                else if (j == 3 || j == 6) {
                    InsertShape (i, j, bB);
                }
                else if (j == 4) {
                    InsertShape (i, j, bQ);
                }
                else if (j == 5) {
                    InsertShape(i,j,bKp);
                }
            }
            else if (i == 8) {
                if (j == 1 || j == 8)  {
                    InsertShape(i,j, wR);
                }
                else if (j == 2 || j == 7) {
                    InsertShape(i,j,wK);
                }
                else if (j == 3 || j == 6) {
                    InsertShape (i, j, wB);
                }
                else if (j == 4) {
                    InsertShape (i, j, wQ);
                }
                else if (j == 5) {
                    InsertShape(i,j,wKp);
                }
            }
        }
    }
}
console.log("AddShapes");
function Rotate() {    
    $('#Board').animate({
        transform: 'rotate(180deg)'
    });  
} 
console.log("Rotate");
function SelectShape (Cell) {
    $(Cell).addClass('Selected');
    selected = true;
}
console.log("SelectShape");
function UnselectShape (Cell) {
    $(Cell).removeClass('Selected');
    $('.Kill').toggleClass('Kill');
    selected = false;
} 
console.log("UnselectShape");
function CancelShape(Cell) {
    UnselectShape(Cell);
    $('.Backlight').toggleClass('Backlight');
    $('.Kill').toggleClass('Kill');
}
console.log("CancelShape");
function PossibleMoves(x,y,Temp_x, Temp_y) {
    return $('[x='+ (parseInt(x)+Temp_x) + '][y='+(parseInt(y)+Temp_y)+']');
}
console.log("PossibleMoves");
function SwitchMoves (Exchange) {
    return !Exchange;
}
console.log("SwitchMoves");
function MovesLogic (x,y,type,color) {
    if (type == 'Pawn')  {
        if (color == 'white') {
            var AvailableCell = PossibleMoves(x,y,-1,0);
            var AttackCell1 = PossibleMoves(x,y,-1,1);
            var AttackCell2 = PossibleMoves(x,y,-1,-1);
            if (Empty(AvailableCell)) {
                AvailableCell.toggleClass('Backlight');
            }
            if (x == 7) { 
                var AvailableCell_1 = PossibleMoves(x,y,-2,0);
                if (Empty(AvailableCell_1)) {
                    AvailableCell_1.toggleClass('Backlight'); 
                }
            }
            if (!Empty(AttackCell1) && $(AttackCell1).children().attr('color') != color) {
                AttackCell1.toggleClass('Kill')
            }
            if (!Empty(AttackCell2) && $(AttackCell2).children().attr('color') != color) {
                AttackCell2.toggleClass('Kill')
            }
        }
        else if (color == 'black') {
            var AvailableCell = PossibleMoves(x,y,1,0); 
            var AttackCell1 = PossibleMoves(x,y,1,1); 
            var AttackCell2 = PossibleMoves(x,y,1,-1);
            if (Empty(AvailableCell)) {
                AvailableCell.toggleClass('Backlight');
            }
            if (x == 2) { 
                var AvailableCell_1 = PossibleMoves(x,y,2,0); 
                if (Empty(AvailableCell_1)) {
                    AvailableCell_1.toggleClass('Backlight'); 
                }
            }
            if (!Empty(AttackCell1) && $(AttackCell1).children().attr('color') != color) {
                AttackCell1.toggleClass('Kill')
            }
            if (!Empty(AttackCell2) && $(AttackCell2).children().attr('color') != color) {
                AttackCell2.toggleClass('Kill')
            }
        }
    }
        else if (type == 'Rook') {
            for (var i = x; i < 9; i++) {
                    var AvailableCell = PossibleMoves(i,y,1,0);
                if (Empty(AvailableCell)) {
                    AvailableCell.toggleClass('Backlight');
                } else {
                    if ($(AvailableCell).children().attr('color') != color) {
                        AvailableCell.toggleClass('Kill');
                    }
                    break;
                }

            }
            for (var i = x; i > 0; i--) {
                    var AvailableCell = PossibleMoves(i,y,-1,0);
                if (Empty(AvailableCell)) {
                    AvailableCell.toggleClass('Backlight');
                } else {
                    if ($(AvailableCell).children().attr('color') != color) {
                        AvailableCell.toggleClass('Kill');
                    }
                    break;
                }

            }
            for (var j = y; j < 9; j++) {
                    var AvailableCell = PossibleMoves(x,j,0,1)
                if (Empty(AvailableCell)) {
                    AvailableCell.toggleClass('Backlight');
                } else {
                    if ($(AvailableCell).children().attr('color') != color) {
                        AvailableCell.toggleClass('Kill');
                    }
                    break;
                }
            }
            for (var j = y; j > 0; j--) {
                    var AvailableCell = PossibleMoves(x,j,0,-1);
                if (Empty(AvailableCell)) {
                    AvailableCell.toggleClass('Backlight');
                } else {
                    if ($(AvailableCell).children().attr('color') != color) {
                        AvailableCell.toggleClass('Kill');
                    }
                    break;
                }
            }
        }
        else if (type == 'Knight') {
            var AvailableCell1 = PossibleMoves(x,y,-2,1);
            var AvailableCell2 = PossibleMoves(x,y,-2,-1);
            var AvailableCell3 = PossibleMoves(x,y,-1,-2);
            var AvailableCell4 = PossibleMoves(x,y,-1,2);
            var AvailableCell5 = PossibleMoves(x,y,1,2);
            var AvailableCell6 = PossibleMoves(x,y,1,-2);
            var AvailableCell7 = PossibleMoves(x,y,2,1);
            var AvailableCell8 = PossibleMoves(x,y,2,-1);
        if (Empty(AvailableCell1)) {
            AvailableCell1.toggleClass('Backlight');
        }
        else {
            if ($(AvailableCell1).children().attr('color') != color) {
                AvailableCell1.toggleClass('Kill');
            }
        }
        if (Empty(AvailableCell2)) {
            AvailableCell2.toggleClass('Backlight');
        }
        else {
            if ($(AvailableCell2).children().attr('color') != color) {
                AvailableCell2.toggleClass('Kill');
            }
        }
        if (Empty(AvailableCell3)) {
            AvailableCell3.toggleClass('Backlight');
        }
        else {
            if ($(AvailableCell3).children().attr('color') != color) {
                AvailableCell3.toggleClass('Kill');
            }
        }
        if (Empty(AvailableCell4)) {
            AvailableCell4.toggleClass('Backlight');
        }
        else {
            if ($(AvailableCell4).children().attr('color') != color) {
                AvailableCell4.toggleClass('Kill');
            }
        }
        if (Empty(AvailableCell5)) {
            AvailableCell5.toggleClass('Backlight');
        }
        else {
            if ($(AvailableCell5).children().attr('color') != color) {
                AvailableCell5.toggleClass('Kill');
            }
        }
        if (Empty(AvailableCell6)) {
            AvailableCell6.toggleClass('Backlight');
        }
        else {
            if ($(AvailableCell6).children().attr('color') != color) {
                AvailableCell6.toggleClass('Kill');
            }
        }
        if (Empty(AvailableCell7)) {
            AvailableCell7.toggleClass('Backlight');
        }
        else {
            if ($(AvailableCell7).children().attr('color') != color) {
                AvailableCell7.toggleClass('Kill');
            }
        }
        if (Empty(AvailableCell8)) {
            AvailableCell8.toggleClass('Backlight');
        }
        else {
            if ($(AvailableCell8).children().attr('color') != color) {
                AvailableCell8.toggleClass('Kill');
            }
        }
    }
    else if (type == 'Bishop') {
        for (var i = 1; i < 9; i++) {
            var AvailableCell1 = PossibleMoves(x,y,i,i);
            if (Empty(AvailableCell1)) {
                AvailableCell1.toggleClass('Backlight');
            } else  {
                if ($(AvailableCell1).children().attr('color') != color) {
                    AvailableCell1.toggleClass('Kill');
                }
                break;
            }
        }
        for (var i = 1; i < 9; i++) {
            var AvailableCell2 = PossibleMoves(x,y,i,-i);
            if (Empty(AvailableCell2)) {
                AvailableCell2.toggleClass('Backlight');
            } else {
                if ($(AvailableCell2).children().attr('color') != color) {
                    AvailableCell2.toggleClass('Kill');
                }
                break;
            }
        }
        for (var i = 1; i < 9; i++) {
            var AvailableCell3 = PossibleMoves(x,y,-i,i)
            if (Empty(AvailableCell3)) {
                AvailableCell3.toggleClass('Backlight');
            } else {
                if ($(AvailableCell3).children().attr('color') != color) {
                    AvailableCell3.toggleClass('Kill');
                }
                break;
            }
        }
        for (var i = 1; i < 9; i++) {
            var AvailableCell4 = PossibleMoves(x,y,-i,-i);
            if (Empty(AvailableCell4)) {
                AvailableCell4.toggleClass('Backlight');
            } else {
                if ($(AvailableCell4).children().attr('color') != color) {
                    AvailableCell4.toggleClass('Kill');
                }
                break;
            }
        }
    }
    else if (type == 'Queen') {
            for (var i = x; i < 9; i++) {
                    var AvailableCell = PossibleMoves(i,y,1,0);
                if (Empty(AvailableCell)) {
                    AvailableCell.toggleClass('Backlight');
                } else {
                    if ($(AvailableCell).children().attr('color') != color) {
                        AvailableCell.toggleClass('Kill');
                    }
                    break;
                }

            }
            for (var i = x; i > 0; i--) {
                    var AvailableCell = PossibleMoves(i,y,-1,0);
                if (Empty(AvailableCell)) {
                    AvailableCell.toggleClass('Backlight');
                } else {
                    if ($(AvailableCell).children().attr('color') != color) {
                        AvailableCell.toggleClass('Kill');
                    }
                    break;
                }

            }
            for (var j = y; j < 9; j++) {
                    var AvailableCell = PossibleMoves(x,j,0,1)
                if (Empty(AvailableCell)) {
                    AvailableCell.toggleClass('Backlight');
                } else {
                    if ($(AvailableCell).children().attr('color') != color) {
                        AvailableCell.toggleClass('Kill');
                    }
                    break;
                }
            }
            for (var j = y; j > 0; j--) {
                    var AvailableCell = PossibleMoves(x,j,0,-1);
                if (Empty(AvailableCell)) {
                    AvailableCell.toggleClass('Backlight');
                } else {
                    if ($(AvailableCell).children().attr('color') != color) {
                        AvailableCell.toggleClass('Kill');
                    }
                    break;
                }
            }
            for (var i = 1; i < 9; i++) {
                    var AvailableCell1 = PossibleMoves(x,y,i,i);
                if (Empty(AvailableCell1)) {
                    AvailableCell1.toggleClass('Backlight');
                } else  {
                    if ($(AvailableCell1).children().attr('color') != color) {
                        AvailableCell1.toggleClass('Kill');
                    }
                    break;
                }
            }
            for (var i = 1; i < 9; i++) {
                var AvailableCell2 = PossibleMoves(x,y,i,-i);
                if (Empty(AvailableCell2)) {
                    AvailableCell2.toggleClass('Backlight');
                } else {
                    if ($(AvailableCell2).children().attr('color') != color) {
                        AvailableCell2.toggleClass('Kill');
                    }
                    break;
                }
            }
            for (var i = 1; i < 9; i++) {
                var AvailableCell3 = PossibleMoves(x,y,-i,i)
                if (Empty(AvailableCell3)) {
                    AvailableCell3.toggleClass('Backlight');
                } else {
                    if ($(AvailableCell3).children().attr('color') != color) {
                        AvailableCell3.toggleClass('Kill');
                    }
                    break;
                }
            }
            for (var i = 1; i < 9; i++) {
                var AvailableCell4 = PossibleMoves(x,y,-i,-i);
                if (Empty(AvailableCell4)) {
                    AvailableCell4.toggleClass('Backlight');
                } else {
                    if ($(AvailableCell4).children().attr('color') != color) {
                    AvailableCell4.toggleClass('Kill');
                    }
                break;
            }
        }
    }
    else if (type == 'King') {
        var AvailableCell1 = PossibleMoves(x,y,1,1);
        var AvailableCell2 = PossibleMoves(x,y,1,0);
        var AvailableCell3 = PossibleMoves(x,y,1,-1);
        var AvailableCell4 = PossibleMoves(x,y,0,-1);
        var AvailableCell5 = PossibleMoves(x,y,-1,-1);
        var AvailableCell6 = PossibleMoves(x,y,-1,0);
        var AvailableCell7 = PossibleMoves(x,y,-1,1);
        var AvailableCell8 = PossibleMoves(x,y,0,1);
        if (Empty(AvailableCell1)) {
            AvailableCell1.toggleClass('Backlight');
        }
        else  {
            if ($(AvailableCell1).children().attr('color') != color) {
                AvailableCell1.toggleClass('Kill');
            }
        }
        if (Empty(AvailableCell2)) {
            AvailableCell2.toggleClass('Backlight');
        }
        else  {
            if ($(AvailableCell2).children().attr('color') != color) {
                AvailableCell2.toggleClass('Kill');
            }
        }
        if (Empty(AvailableCell3)) {
            AvailableCell3.toggleClass('Backlight');
        }
        else  {
            if ($(AvailableCell3).children().attr('color') != color) {
                AvailableCell3.toggleClass('Kill');
            }
        }
        if (Empty(AvailableCell4)) {
            AvailableCell4.toggleClass('Backlight');
        }
        else  {
            if ($(AvailableCell4).children().attr('color') != color) {
                AvailableCell4.toggleClass('Kill');
            }
        }
        if (Empty(AvailableCell5)) {
            AvailableCell5.toggleClass('Backlight');
        }
        else  {
            if ($(AvailableCell5).children().attr('color') != color) {
                AvailableCell5.toggleClass('Kill');
            }
        }
        if (Empty(AvailableCell6)) {
            AvailableCell6.toggleClass('Backlight');
        }
        else  {
            if ($(AvailableCell6).children().attr('color') != color) {
                AvailableCell6.toggleClass('Kill');
            }
        }
        if (Empty(AvailableCell7)) {
            AvailableCell7.toggleClass('Backlight');
        }
        else  {
            if ($(AvailableCell7).children().attr('color') != color) {
                AvailableCell7.toggleClass('Kill');
            }
        }
        if (Empty(AvailableCell8)) {
            AvailableCell8.toggleClass('Backlight');
        }
        else  {
            if ($(AvailableCell8).children().attr('color') != color) {
                AvailableCell8.toggleClass('Kill');
            }
        }
    }
}
console.log("MovesLogic");
function InsertShape (x,y,Shape) {
    $('[x='+x+']'+'[y='+y+']').append(Shape);
}
console.log("InsertShape");
function Move (Shape, Coordinate) {
    var ShapeType = $(Shape).attr('type');
    var xCord = $(Coordinate).attr('x');
    if ($(Coordinate).hasClass('Backlight')) {
        UnselectShape($(Shape).parent()); 
        $(Coordinate).append(Shape); 
        return true; 
    }
    else {
        alert ('Ход недопустим!');
        return false;
    }
} 
console.log("Move");
function Attack (AttackedCell) {
    if ($(AttackedCell).hasClass('Kill')) { 
        var AttackedShape = $(AttackedCell).children(); 
        var AttackedShapeColor = AttackedShape.attr('color');
        $(AttackedCell).toggleClass('Kill').toggleClass('Backlight');
            if (AttackedShapeColor == 'black') { 
                $('#KilledShapes').append(AttackedShape); 
            } else {
                $('#KilledShapes').append(AttackedShape);
                }
            } else {
                alert('Атака невозможна!');
            }
} 
console.log("Attack");
function Empty (Cell) {
    if ($(Cell).find('img').length == 0) return true;
    return false;
}
console.log("Empty");
$(document).ready(function () {
    var WhiteMove = true; 
    var Cell = '.BlackCell,.WhiteCell';
    $('#Board').on('click', Cell, function(){
        if (!selected && !Empty(this)) { 
            SaveShape = $(this).children()[0];
            var SaveShapeColor = $(SaveShape).attr('color');
            var SaveShapeType = $(SaveShape).attr('type'); 
            var SaveShapeX = $(SaveShape).parent().attr('x'); 
            var SaveShapeY = $(SaveShape).parent().attr('y'); 
            if (WhiteMove && SaveShapeColor == 'white') {
                SelectShape(this); 
                MovesLogic(SaveShapeX,SaveShapeY,SaveShapeType,SaveShapeColor);
        } else if (WhiteMove && SaveShapeColor != 'white') { 
                $('#Info').toggleClass('WarningInfo');
                alert ('Ходят белые!');
        }
        else if (!WhiteMove && SaveShapeColor == 'black') {
                SelectShape(this); 
                MovesLogic(SaveShapeX,SaveShapeY,SaveShapeType,SaveShapeColor);
                selected = true;
        }
        else if (!WhiteMove && SaveShapeColor == 'white') { 
                $('#Info').toggleClass('WarningInfo');
                alert ('Ходят черные!');
        }
    }
        else if (selected && $(this).hasClass('Selected')) {
            CancelShape(this); 
        }
        else if (selected && Empty(this)) {
            if (Move(SaveShape, this)) { 
                $('.Backlight').toggleClass('Backlight');
                WhiteMove = SwitchMoves(WhiteMove);
            }
        }
        else if (selected && !Empty(this)) {
            Attack(this);
            if (Move(SaveShape,this)) {
                $('.Backlight').toggleClass('Backlight');
                WhiteMove = SwitchMoves(WhiteMove); 
            }
        }
        if (WhiteMove) {
            $('#Info').removeClass('WarningInfo');
            $('#Info').text('Ход белых!');
        } else {
            $('#Info').removeClass('WarningInfo');
            $('#Info').text('Ход черных!');
        }
	});
});         
console.log("ready");                  
function HideCanvas() { document.getElementById('myCanvas').style.display = 'none'; }  
console.log("HideCanvas");