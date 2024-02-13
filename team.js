export async function updatePoints(req, res) {
  const { id } = req.params;
  let mainQuest = [];
  let sideQuest = [];
  try {
    let { score, hintId } = req.body;
    const team = await TeamModel.findById(id).populate("route").exec();
    if (!team) return res.send(createResponse(DATA_NOT_FOUND));
    // console.log(team);
    mainQuest =
      Array.isArray(team.mainQuest) && team.mainQuest.length > 0
        ? team.mainQuest
        : [];
    sideQuest =
      Array.isArray(team.sideQuest) && team.sideQuest.length > 0
        ? team.sideQuest
        : [];

    const quests = team.route;
    // console.log(hintId);
    // check if main quest
    // console.log(quests.hints.length);
    if (
      quests.hints.length > team.numMain &&
      quests.hints[team.numMain].toString() === hintId
    ) {
      mainQuest = [...mainQuest, hintId];
      score = 100;
      console.log("Hint added ", mainQuest);
    } else {
      // console.log(hintId);
      const hint = await HintsModel.findOne({ _id: hintId, type: "side" });
      // console.log(hint);
      // if side quest is found
      if (hint) {
        if (team.sideQuest.includes(hintId)) {
          return res.send(createResponse(QUEST_ALREADY_EXISTS));
        } else {
          sideQuest = [...sideQuest, hintId];
          score = 50;
        }
      } else {
        return res.send(createResponse(INVALID_QUEST)); // invalid hint
      }
    }

    const updatedTeam = await TeamModel.findByIdAndUpdate(
      id,
      {
        score: team.score + score,
        numMain: mainQuest.length,
        numSide: sideQuest.length,
        mainQuest: mainQuest,
        sideQuest: sideQuest,
      },
      { new: true }
    )
      .populate("mainQuest")
      .populate("sideQuest")
      .select("-route -teamMembers -teamLead")
      .exec();
    const hint = await HintsModel.findById({ _id: hintId }).exec();
    if (!updatedTeam) return res.send(createResponse(DATA_NOT_FOUND));
    if (!hint) return res.send(createResponse(DATA_NOT_FOUND));
    // res.send(createResponse(TEAM_UPDATED, updatedTeam));
    res.send(createResponse(TEAM_UPDATED, hint));
  } catch (error) {
    console.log(error);
    res.send(createResponse(INTERNAL_SERVER_ERROR));
  }
}
