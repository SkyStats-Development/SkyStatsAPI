const { wrap } = require('../functions/wrapFunction')
const { getSkyHelper } = require(`../functions/getSkyHelper`)
const { getPlayer } = require("../functions/getPlayer")
const { calcSkill } = require("../functions/calcSkills");
module.exports = wrap(async function (req, res) {
    const { uuid2, username, profilename, profileid, playerData, profileData, profile, error } = await getPlayer(req.params.username);
    if (error) {
        return  res.status(400).json({ error: "An unexpected error occurred while fetching the player's data." + error })
    }
    const networthRaw = await getSkyHelper(profileid, uuid2);
    let dungeons_data = profile?.dungeons
    let run_data = dungeons_data?.last_dungeon_run
    if (run_data === null || undefined) {
        run_data = "No Run Found"
    } 
    const catacombs = calcSkill("dungeoneering", dungeons_data?.dungeon_types?.catacombs?.experience.toString())
    return res.status(200).json({status: 200, data: 
        {
            player_uuid: uuid2,
            player_username: username,
            player_profilename: profilename || "PROFILE_NAME_NOT_FOUND",
            player_profileid: profileid || "NO_ID",
            total_networth: networthRaw.networth.networth.toString() || 0,
            magical_power: profile?.accessory_bag_storage.highest_magical_power || 0,
            selected_magical_power: profile?.accessory_bag_storage.selected_power || "NO_POWER",
            dungeons: {
                catacombs_secrets: playerData.player.achievements.skyblock_treasure_hunter || 0,
                catacombs_experience: catacombs || 0,
                last_floor: run_data || 0,
                selected_class: dungeons_data?.selected_dungeon_class || "NO_CLASS",
                daily_completed_runs: dungeons_data?.daily_runs?.completed_runs_count || 0,
                catacombs: {
                    fastest_times: {
                        s_runs: dungeons_data?.dungeon_types?.catacombs?.fastest_time_s || 0,
                        s_plus_runs: dungeons_data?.dungeon_types?.catacombs?.fastest_time_s_plus || 0,
                        runs: dungeons_data?.dungeon_types?.catacombs?.fastest_time || 0
                        },
                    },
                    master_catacombs: {
                        fastest_times: {
                            s_runs: dungeons_data?.dungeon_types?.master_catacombss?.fastest_time_s || 0,
                            s_plus_runs: dungeons_data?.dungeon_types?.master_catacombs?.fastest_time_s_plus || 0,
                            runs: dungeons_data?.dungeon_types?.master_catacombs?.fastest_time || 0
                            },
                    },
                },
            }
    }
    )
})
