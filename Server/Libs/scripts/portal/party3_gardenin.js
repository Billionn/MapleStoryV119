function enter(pi) {
	if (pi.getPlayer().getParty() != null && pi.isLeader() && pi.haveItem(4001055,1)) {
		pi.warpParty(920010100);
		pi.playPortalSE();
		return true;
	} else {
		pi.playerMessage(5,"Please get the leader in this portal, make sure you have the Root of Life.");
		return false;
	}
	
}