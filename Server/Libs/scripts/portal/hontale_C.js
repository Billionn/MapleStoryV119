function enter(pi) {

    if (pi.isLeader() == true) {
        var eim = pi.getPlayer().getEventInstance();
        var party = eim.getPlayers();
        var target;
        var target;
		if(eim.getMapInstance(240050200).getReactorByName("light").getState() == 1){
			target = eim.getMapInstance(240050300); //light
		}else{
			target = eim.getMapInstance(240050310); //dark
		}
        var targetPortal = target.getPortal("sp");
        //Warp the full party into the map...
        var partyy = pi.getPlayer().getEventInstance().getPlayers();
        for (var i = 0; i < partyy.size(); i++) {
            party.get(i).changeMap(target, targetPortal);
        }
        return true;
    } else {
        pi.playerMessage(6, "�A���O�����A�u�������i�H�q�L�o�Ӷǰe�I");
        return false;
    }
}