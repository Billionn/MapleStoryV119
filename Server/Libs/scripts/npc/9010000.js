/**
-- Odin JavaScript --------------------------------------------------------------------------------
	Faito(Showa Exchange Quest) - Showa Town(801000300)
-- By ---------------------------------------------------------------------------------------------
	Information
-- Version Info -----------------------------------------------------------------------------------
	1.0 - First Version by Information
	    - Base from Sean360 script, thanks
---------------------------------------------------------------------------------------------------
**/

var status = -1;
var eQuestChoices = new Array (1302064,1312032,1322054,1332055,1332056,1372034,1382039,1402039,1412027,1422029,1432040,1442051,
								1452045,1462040,1472055,
								1092045,1092046,1092047,
						//�Y���}�l
						1002508,1002509,1002510,1002511

						); 

var eQuestPrizes = new Array();

var requiredItemArr = new Array(
					[1302020,4001126],
					[1412011,4001126],
					[1422014,4001126],
					[1332025,4001126],
					[1332025,4001126],
					[1382009,4001126],
					[1382012,4001126],
					[1302020,4001126],
					[1412011,4001126],
					[1412014,4001126],
					[1432012,4001126],
					[1442024,4001126],
					[1452022,4001126],
					[1462019,4001126],
					[1472030,4001126],
					//�޵P�}�l
					[1092030,4001126],
					[1092030,4001126],
					[1092030,4001126],
					//�Y���}�l
					[4001126],
					[4001126,1002508],
					[4001126,1002509],
					[4001126,1002510]
					);
var requiredItemNumArr = new Array(
					[1,2000],
					[1,1500],
					[1,1500],
					[1,2000],
					[1,2000],
					[1,2000],
					[1,1500],
					[1,2000],
					[1,1500],
					[1,1500],
					[1,2000],
					[1,1500],
					[1,2000],
					[1,2000],
					[1,2000],
					//�޵P�}�l
					[1,2000],
					[1,2000],
					[1,2000],
					//�����Y��
					[100],
					[200,1],
					[300,1],
					[400,1]
					);
var requiredMoneyArr = new Array(50000,50000,50000,50000,50000,50000,50000,50000,50000,50000,50000,50000,50000,50000,50000
						//�޵P�}�l
						,500000,500000,500000
						//�Y���}�l
						,500,5000,50000,500000

								);
var Allscroll = new Array(2040315,2040912,2043013,2043108,2043208,2043308,2043708,
					2043808,2044008,2044108,2044208,2044308,2044408,2044508,2044608,2044708
					);
								
var requiredItem  = 0;

var requiredItemNum = 0;

var lastSelection = -1;

var remoney = 0;

var reward;

var itemSet;


function action(mode, type, selection) {
	if (status == 2 && mode != 1 ) {
		cm.sendOk("�n�n�y���a!�����D�w���H�ɧ�ڡ�");
		cm.safeDispose();
		return;
	}
	status++;

    if (status == 0) {
		var eQuestChoice = makeChoices(eQuestChoices);
		cm.sendSimple(eQuestChoice);
    } else if (status == 1){
		if(selection == 23){
			cm.sendYesNo("�A�T�w�n�I��#b�g�~�y���b#k��?\r\n�ݭn#b#v4001126##t4001126#300��#k\r\n" );
			status++;
		}else{
			requiredItem = requiredItemArr[selection];
			requiredItemNum = requiredItemNumArr[selection];
			reward = eQuestChoices[selection];
			remoney = requiredMoneyArr[selection];
			var eRequired = makeRequire(requiredItem,requiredItemNum,reward,remoney);
			cm.sendSimple(eRequired);
		}
		lastSelection = selection;
	}else if(status == 2){	
		cm.sendYesNo("�A�T�w�A�n�s�@#b#v"+ reward + "##t" + reward +"##k��?\r\n" );
    }else if(status == 3){
		if(lastSelection == 23){
			itemSet = (Math.floor(Math.random() * Allscroll.length));
			reward = Allscroll[itemSet];
			if(!cm.haveItem(4001126,300)){
					cm.sendOk("�A����������\r\n" );
					cm.dispose();
					return ;
			}
			if(!cm.canHold(reward)){
				cm.sendOk("�A�����~��w�g���F�I\r\n" );
				cm.dispose();
				return ;
			}
			cm.gainItem(4001126,-300);
			cm.gainItem(reward,1);
			cm.sendOk("�Ʊ�z�}�ߡI\r\n" );
			cm.dispose();
			
		}else{
			for(var i = 0 ; i < requiredItem.length ; i++){
				if(!cm.haveItem(requiredItem[i],requiredItemNum[i])){
					cm.sendOk("�٨S���������ܡH\r\n" );
					cm.dispose();
					return ;
				}
			}
			if(cm.getMeso() < remoney){
				cm.sendOk("�A���������I\r\n" );
				cm.dispose();
				return ;
			}
			if(!cm.canHold(reward)){
				cm.sendOk("�A�����~��w�g���F�I\r\n" );
				cm.dispose();
				return ;
			}
			cm.gainMeso(-remoney);
			for(var i=0 ; i < requiredItem.length ; i++ ){
				cm.gainItem(requiredItem[i] , -requiredItemNum[i]);
			}
			cm.gainItem(reward,1,true);
			cm.sendOk("�����o�I�~��Y����R�������a�I\r\n" );
			cm.dispose();
		}
	}
}

function makeChoices(a){
    var result  = "�o�ӥ@�ɥR���F���R��#b#v4001126##t4001126##k\r\n�Y�O�A�����F������#b#v4001126##t4001126##k�A�٥i�H�M�ڥ洫§���O!\r\n";
    for (var x = 0; x< a.length; x++){
		result += " #L" + x + "##v" + a[x] + "##t" + a[x] + "##l\r\n";
    }
	result += "#L23##b�ڷQ�I���g�~�y���b...#k#l\r\n";
    return result;
}

function makeRequire(a,b,re,m){
    var result  = "�`�N�I���X�Ӫ����~#b���賣�O�H��#k����~\r\n�s�@#b#v"+re+"##t"+re+"##k�ݭn�H�U���~�G\r\n\r\n";
    for (var x = 0; x< a.length; x++){
		result += "#v" + a[x] + "##t" + a[x] + "# " + b[x]+ "��#l\r\n";
    }
	result +="#fUI/UIWindow.img/QuestIcon/7/0##b"+m+"#k\r\n";
    return result;
}
