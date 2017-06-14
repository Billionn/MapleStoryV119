var normal = Array(2022216,2022222,2022223);
var common = Array(2022221,2022220,2022218);
var rare = Array(2022217,2022219);

function getRandom(min, max) {
	if (min > max) {
		return(-1);
	}
	if (min == max) {
		return(min);
	}
	return(min + parseInt(Math.random() * (max - min + 1)));
}

var icommon = common[getRandom(0, common.length - 1)];
var inormal = normal[getRandom(0, normal.length - 1)];
var irare = rare[getRandom(0, rare.length - 1)];
var chance = getRandom(0, 20);
var status = 0;

function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	if (mode == -1) {
		cm.dispose();
	} else {
		if (mode == 0) {
			cm.dispose();
			return;
		}
		if (mode == 1)
			status++;
		else
			status--;
		if (status == 0) {
			if(cm.haveItem(5310000)){
				cm.sendYesNo("�ڬO�L�L�w�A�A�۫H�R�B�P�y�ܡH\r\n�@�ӤH���R�B�γ\�O�`�w�n��\r\n�u�n�A��#k#v"+ 5310000 +"##l�A�ڥi�H���A�e�R���骺�B��A�Q�ոլ�?");
			}else{
				cm.sendOk("�ڬO�L�L�w�A�A�۫H�R�B�P�y��?�u�n�A��\r\n#k#v"+ 5310000 +"##l\r\n�N�i�H�e�R�@��~");
				cm.dispose();
			}
		} else if (status == 1) {
			if(cm.haveItem(5310000) && cm.canHold(2000000) ){
				if (chance > 0 && chance <= 8) {
					cm.sendOk("�A���Ѫ����B�P�y�O#k#v"+icommon+"##b#t"+icommon+"##k#l!�ݨӧA���ѹB�𴶴�");
					cm.gainItem(icommon, 1);
				} else if (chance >= 9 && chance <= 16) {
					cm.sendOk("�A���Ѫ����B�P�y�O#k#v"+inormal+"##b#t"+inormal+"##k#l!�A���Ѫ��B���٤���");
					cm.gainItem(inormal, 1);
				} else {
					cm.sendOk("�A���Ѫ����B�P�y�O#k#v"+irare+"##b#t"+irare+"##k#l!�z!�A���B��n���F");
					cm.gainItem(irare, 1);
				}
				cm.gainItem(5310000,-1);
			}else{
				cm.sendOk("�нT�w�A���W���Ŷ�");
			}
			cm.dispose();
		}
	}
}