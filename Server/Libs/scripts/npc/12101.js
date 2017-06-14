/* Author: Xterminator
	NPC Name: 		Rain
	Map(s): 		Maple Road : Amherst (1010000)
	Description: 		Talks about Amherst
*/
var status = 0;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == 1)
	status++;
    else
	status--;
	
    if (status == 0) {
	cm.sendNext("�o�O�@�ӦW��#b������#k������A��󷬤��q���F�_���C�A���D�A�����q�A�X��Ǫ̡A��a�H�ګܰ����o�Ӧa��P��u���z�p���Ǫ��C");
    } else if (status == 1) {
	cm.sendNextPrev("�p�G�A�Q�ܱo��j�A�Хh#b������#k�A���̦��@�Ӵ�f�C�����ܤj����A�e���W��#b���h�Q�ȴ�#k���a��C�P�o�Ӥp�q�ۤ�A�����j�p�O�Ѯt�a�O���C");
    } else if (status == 2) {
	cm.sendPrev("�b���h�Q�ȴ�A�A�i�H��ܧA��¾�~�C��ť�����@�ӻr�S���A��D������A�C�h��b���Ӧa��C���a...�|�O���˪��a��H");
    } else if (status == 3) {
	cm.dispose();
    }
}