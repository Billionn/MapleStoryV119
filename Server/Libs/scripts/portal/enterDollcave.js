function enter(pi) {
	if (pi.getQuestStatus(21728) == 1){
		pi.forceCompleteQuest(21728);
		pi.mapMessage("有著暗號無法進入");
		return false;
	}
    if (pi.getQuestStatus(21720) == 1) {
    	pi.warp(910050200,0);
    } else {
    	pi.warp(910050300,0);
    }
}