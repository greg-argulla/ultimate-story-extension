/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import OBR from "@owlbear-rodeo/sdk";
import landingBG from "./assets/bg.jpg";
import "./App.css";

document.body.style.overflow = "hidden";

const Text = (props) => {
  const { children } = props;
  return <span className="outline">{children}</span>;
};

const newPlayer = (isGMPlayer) => {
  if (isGMPlayer) {
    return {
      id: Date.now(),
      isGMPlayer: isGMPlayer,
      name: "",
      traits: {
        name: "",
      },
      attributes: {
        dex: "d8",
        ins: "d8",
        mig: "d8",
        wil: "d8",
        currentdex: "d8",
        currentins: "d8",
        currentmig: "d8",
        currentwil: "d8",
      },
      debuff: {
        slow: false,
        dazed: false,
        weak: false,
        shaken: false,
        enraged: false,
        poisoned: false,
      },
      actions: [
        {
          name: "",
          info: "",
          detail: "",
          diceOne: "dex",
          diceTwo: "dex",
          bonus: 0,
          damage: 0,
          useHR: true,
        },
      ],
    };
  }

  return {
    id: Date.now(),
    isGMPlayer: isGMPlayer,
    name: "",
    level: 5,
    traits: {
      name: "",
      identity: "",
      theme: "",
      origin: "",
      level: 5,
    },
    bonds: [
      { name: "", emotionOne: "", emotionTwo: "", emotionThree: "" },
      { name: "", emotionOne: "", emotionTwo: "", emotionThree: "" },
      { name: "", emotionOne: "", emotionTwo: "", emotionThree: "" },
      { name: "", emotionOne: "", emotionTwo: "", emotionThree: "" },
      { name: "", emotionOne: "", emotionTwo: "", emotionThree: "" },
      { name: "", emotionOne: "", emotionTwo: "", emotionThree: "" },
    ],
    attributes: {
      dex: "d8",
      ins: "d8",
      mig: "d8",
      wil: "d8",
      currentdex: "d8",
      currentins: "d8",
      currentmig: "d8",
      currentwil: "d8",
    },
    debuff: {
      slow: false,
      dazed: false,
      weak: false,
      shaken: false,
      enraged: false,
      poisoned: false,
    },
    stats: {
      defense: 8,
      mDefense: 8,
      initMod: 0,
      hpMod: 0,
      mpMod: 0,
      ipMod: 0,
      fabula: 0,
      experience: 0,
    },
    items: {
      accessory: "",
      armor: "",
      mainhand: "",
      offhand: "",
      notes: "",
      zenit: 0,
      martialRitual: "",
    },
    skills: [
      {
        categoryName: "",
        categoryInfo: "",
        items: [{ name: "", info: "", detail: "" }],
      },
      {
        categoryName: "",
        categoryInfo: "",
        items: [{ name: "", info: "", detail: "" }],
      },
    ],
    actions: [
      {
        name: "",
        info: "",
        detail: "",
        diceOne: "dex",
        diceTwo: "dex",
        bonus: 0,
        damage: 0,
        useHR: true,
      },
    ],
  };
};

const getDiceStat = (dice) => {
  if (dice === "d6") {
    return 6;
  }
  if (dice === "d8") {
    return 8;
  }
  if (dice === "d10") {
    return 10;
  }
  if (dice === "d12") {
    return 12;
  }
};

function App() {
  const [isOBRReady, setIsOBRReady] = useState(false);
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [metadata, setMetadata] = useState([]);
  const [playerList, setPlayerList] = useState([]);
  const [savedPlayerList, setSavePlayerList] = useState([]);
  const [player, setPlayer] = useState(null);
  const [tab, setTab] = useState("stats");
  const [role, setRole] = useState("PLAYER");

  useEffect(() => {
    OBR.onReady(async () => {
      const metadata = await OBR.scene.getMetadata();
      if (metadata["ultimate.story.extension/metadata"]) {
        const playerListGet = await createPlayerList(metadata);
        setPlayerList(playerListGet);
      }
      setIsOBRReady(true);
      setName(await OBR.player.getName());
      setId(await OBR.player.getId());

      OBR.player.onChange(async (player) => {
        setName(await OBR.player.getName());
      });
      setRole(await OBR.player.getRole());
    });
  }, []);

  const createPlayerList = async (metadata) => {
    const metadataGet = metadata["ultimate.story.extension/metadata"];
    setMetadata(metadataGet);
    const playerListGet = [];
    const keys = Object.keys(metadataGet);
    keys.forEach((key) => {
      playerListGet.push(metadataGet[key]);
    });
    return playerListGet;
  };

  useEffect(() => {
    if (isOBRReady) {
      OBR.scene.onMetadataChange(async (metadata) => {
        const playerListGet = await createPlayerList(metadata);
        setPlayerList(playerListGet);
      });

      const localPlayerList = JSON.parse(
        localStorage.getItem("ultimate.story.extension/metadata")
      );
      setSavePlayerList(localPlayerList);
    }
  }, [isOBRReady]);

  const [timeoutID, setTimeoutID] = useState(null);

  const updatePlayer = (playerGet) => {
    if (!timeoutID) {
      const myTimeout = setTimeout(() => {
        savePlayer();
      }, 500);
      setTimeoutID(myTimeout);
    } else {
      clearTimeout(timeoutID);
      const myTimeout = setTimeout(() => {
        savePlayer();
      }, 500);
      setTimeoutID(myTimeout);
    }

    setPlayer(playerGet);
  };

  const savePlayer = () => {
    if (player) {
      let metadataChange = { ...metadata };
      metadataChange[player.id] = { ...player, lastEdit: id };

      OBR.scene.setMetadata({
        "ultimate.story.extension/metadata": metadataChange,
      });
      setTimeoutID(null);
    }
  };

  useEffect(() => {
    if (player) {
      if (metadata[player.id].lastEdit !== id) {
        setPlayer(metadata[player.id]);
      }
    }
  }, [metadata]);

  const getDiceAttribute = (attr) => {
    if (attr === "dex") {
      return player.attributes.currentdex;
    }
    if (attr === "ins") {
      return player.attributes.currentins;
    }
    if (attr === "mig") {
      return player.attributes.currentmig;
    }
    if (attr === "wil") {
      return player.attributes.currentwil;
    }
    return attr;
  };

  const sendRoll = (roll) => {
    const rollData = {
      dex: player.attributes.currentdex,
      ins: player.attributes.currentins,
      mig: player.attributes.currentmig,
      wil: player.attributes.currentwil,
      diceOne: getDiceAttribute(roll.diceOne),
      diceTwo: getDiceAttribute(roll.diceTwo),
      diceLabelOne: roll.diceOne.toUpperCase(),
      diceLabelTwo: roll.diceTwo.toUpperCase(),
      bonus: isNaN(parseInt(roll.bonus)) ? 0 : parseInt(roll.bonus),
      damage: isNaN(parseInt(roll.damage)) ? 0 : parseInt(roll.damage),
      useHR: roll.useHR,
      skillName: roll.name,
      info: roll.info,
      detail: roll.detail,
      userId: id,
      username: name,
      id: Date.now(),
    };
    OBR.room.setMetadata({
      "ultimate.story.extension/sendroll": rollData,
    });
  };

  const sendSkill = (skill) => {
    const skillData = {
      skillName: skill.name ? skill.name : "Blank skill",
      info: skill.info,
      detail: skill.detail,
      userId: id,
      username: name,
      id: Date.now(),
    };
    OBR.room.setMetadata({
      "ultimate.story.extension/sendskill": skillData,
    });
  };

  const [windowInnerHeight, setWindowInnerHeight] = useState(
    window.innerHeight
  );

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    function autoResize() {
      setWindowInnerHeight(window.innerHeight);
    }

    window.addEventListener("resize", autoResize);

    // Return a function to disconnect the event listener
    return () => window.removeEventListener("resize", autoResize);
  }, []);

  const removePlayer = (id) => {
    let metadataChange = { ...metadata };

    if (metadataChange[id].isGMPlayer) {
      delete metadataChange[id];

      OBR.scene.setMetadata({
        "ultimate.story.extension/metadata": metadataChange,
      });
    } else {
      if (confirm("Are you sure you want to delete the character?") == true) {
        if (
          confirm(
            "You won't be able to retrieve it back, are you really sure?"
          ) == true
        ) {
          delete metadataChange[id];

          OBR.scene.setMetadata({
            "ultimate.story.extension/metadata": metadataChange,
          });
        }
      }
    }
  };

  const addPlayer = () => {
    const playerGet = newPlayer();
    let metadataChange = { ...metadata };
    metadataChange[playerGet.id] = playerGet;

    OBR.scene.setMetadata({
      "ultimate.story.extension/metadata": metadataChange,
    });
  };

  const saveCharacterLocally = (id) => {
    let metadataChange = { ...metadata };

    const localPlayerList = JSON.parse(
      localStorage.getItem("ultimate.story.extension/metadata")
    );

    if (localPlayerList) {
      localPlayerList.push(metadataChange[id]);
      localStorage.setItem(
        "ultimate.story.extension/metadata",
        JSON.stringify(localPlayerList)
      );

      setSavePlayerList(localPlayerList);
    } else {
      localStorage.setItem(
        "ultimate.story.extension/metadata",
        JSON.stringify([metadataChange[id]])
      );
      setSavePlayerList([metadataChange[id]]);
    }
  };

  const loadLocalCharacter = (data) => {
    let metadataChange = { ...metadata };

    if (metadataChange[data.id]) {
      if (
        !confirm(
          "This character is already loaded, loading this character will replace the character in the current scene. Are you sure you want to replace the existing character?"
        ) == true
      ) {
        return;
      }
    }
    metadataChange[data.id] = data;

    OBR.scene.setMetadata({
      "ultimate.story.extension/metadata": metadataChange,
    });
  };

  const removeCharacterLocally = (index) => {
    if (
      confirm(
        "Are you sure you want to delete this locally stored character?"
      ) == true
    ) {
      const localPlayerList = JSON.parse(
        localStorage.getItem("ultimate.story.extension/metadata")
      );
      localPlayerList.splice(index, 1);
      localStorage.setItem(
        "ultimate.story.extension/metadata",
        JSON.stringify(localPlayerList)
      );
      setSavePlayerList(localPlayerList);
    }
  };

  const addGMCharacter = () => {
    const playerGet = newPlayer(true);
    let metadataChange = { ...metadata };
    metadataChange[playerGet.id] = playerGet;

    OBR.scene.setMetadata({
      "ultimate.story.extension/metadata": metadataChange,
    });
  };

  const debuffItem = (debuff, stat) => {
    return (
      <span
        className="outline"
        style={{
          display: "inline-block",
          padding: 4,
          color: debuff ? "red" : "white",
        }}
      >
        {stat}
      </span>
    );
  };

  const localPlayerItem = (data, index) => {
    return (
      <div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 5,
            marginTop: 5,
          }}
        >
          <Text>Name: </Text>
          <span
            className="outline"
            style={{
              display: "inline-block",
              fontSize: 12,
              color: "orange",
              width: 150,
              textAlign: "center",
            }}
          >
            {data.traits ? data.traits.name : ""}
          </span>

          <Text>Identity: </Text>

          <input
            className="input-stat"
            style={{
              width: 380,
              color: "white",
            }}
            value={data.traits.identity}
            readOnly={true}
          />
          <button
            className="button"
            style={{
              marginLeft: 4,
              width: 96,
              padding: 5,
              marginRight: 4,
              marginLeft: "auto",
            }}
            onClick={() => {
              loadLocalCharacter(data);
            }}
          >
            Load
          </button>
          <button
            className="button"
            style={{
              fontWeight: "bolder",
              width: 25,
              color: "darkred",
            }}
            onClick={() => {
              removeCharacterLocally(index);
            }}
          >
            ✖
          </button>
        </div>
        <hr />
      </div>
    );
  };

  const renderLocalPlayerList = () => {
    if (savedPlayerList.length) {
      return savedPlayerList.map((data, index) => {
        return localPlayerItem(data, index);
      });
    }
    return "";
  };

  const playerItem = (data) => {
    if (data.isGMPlayer) {
      if (role !== "GM") {
        return "";
      }

      return (
        <div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 5,
              marginTop: 5,
            }}
          >
            <Text>Name: </Text>
            <span
              className="outline"
              style={{
                display: "inline-block",
                fontSize: 12,
                color: "orange",
                width: 150,
                textAlign: "center",
              }}
            >
              {data.traits ? data.traits.name : ""}
            </span>
            <Text>Debuff:</Text>
            {debuffItem(data.debuff.slow, "slow")}
            {debuffItem(data.debuff.dazed, "dazed")}
            {debuffItem(data.debuff.weak, "weak")}
            {debuffItem(data.debuff.shaken, "shaken")}
            {debuffItem(data.debuff.enraged, "enraged")}
            {debuffItem(data.debuff.poisoned, "poisoned")}
            <button
              className="button"
              style={{
                marginLeft: 4,
                width: 96,
                padding: 5,
                marginRight: 4,
              }}
              onClick={() => {
                if (data.isGMPlayer) {
                  setTab("actions");
                } else {
                  setTab("stats");
                }

                setPlayer(data);
              }}
            >
              Open
            </button>
            <button
              className="button"
              style={{ fontWeight: "bolder", width: 25, color: "darkred" }}
              onClick={() => {
                removePlayer(data.id);
              }}
            >
              ✖
            </button>
          </div>
          <hr />
        </div>
      );
    }

    return (
      <div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 5,
            marginTop: 5,
          }}
        >
          <div style={{ width: 42 }}>
            <Text>Name: </Text>
          </div>
          <div
            style={{
              width: 150,
              textAlign: "center",
              borderBottom: "1px solid #AAA",
              minHeight: 18,
            }}
          >
            <span className="outline" style={{ fontSize: 12, color: "orange" }}>
              {data.traits.name}
            </span>
          </div>

          <Text>Level: </Text>
          <input
            className="input-stat"
            type="number"
            style={{
              width: 20,
              color: "white",
            }}
            value={data.traits.level}
            readOnly={true}
          />

          <Text>HP:</Text>
          <input
            className="input-stat"
            style={{
              width: 20,
              color: "Red",
            }}
            readOnly={true}
            value={
              getDiceStat(data.attributes.mig) * 5 +
              data.stats.hpMod +
              data.traits.level
            }
          />
          <Text>MP: </Text>
          <input
            className="input-stat"
            style={{
              width: 20,
              color: "LightBlue",
            }}
            readOnly={true}
            value={
              getDiceStat(data.attributes.wil) * 5 +
              data.stats.mpMod +
              data.traits.level
            }
          />
          <Text>IP: </Text>
          <input
            className="input-stat"
            style={{
              width: 20,
              color: "Orange",
            }}
            readOnly={true}
            value={6 + data.stats.ipMod}
          />

          <Text>DEF: </Text>
          <input
            className="input-stat"
            type="number"
            style={{
              width: 20,
              color: "violet",
            }}
            value={data.stats.defense}
            readOnly={true}
          />
          <Text>M.DEF: </Text>
          <input
            className="input-stat"
            type="number"
            style={{
              width: 20,
              color: "cyan",
            }}
            value={data.stats.mDefense}
            readOnly={true}
          />
        </div>

        <Text>Debuff:</Text>

        {debuffItem(data.debuff.slow, "slow")}
        {debuffItem(data.debuff.dazed, "dazed")}
        {debuffItem(data.debuff.weak, "weak")}
        {debuffItem(data.debuff.shaken, "shaken")}
        {debuffItem(data.debuff.enraged, "enraged")}
        {debuffItem(data.debuff.poisoned, "poisoned")}

        <button
          className="button"
          style={{
            fontWeight: "bolder",
            width: 25,
            color: "darkred",
            float: "right",
          }}
          onClick={() => {
            removePlayer(data.id);
          }}
        >
          ✖
        </button>
        <button
          className="button"
          style={{
            marginLeft: 4,
            width: 40,
            padding: 5,
            marginRight: 4,
            float: "right",
          }}
          onClick={() => {
            saveCharacterLocally(data.id);
          }}
        >
          Save
        </button>
        <button
          className="button"
          style={{
            marginLeft: 4,
            width: 96,
            padding: 5,
            marginRight: 4,
            float: "right",
          }}
          onClick={() => {
            setTab("stats");
            setPlayer(data);
          }}
        >
          Open
        </button>

        <hr />
      </div>
    );
  };

  const renderPlayerList = () => {
    return (
      <div style={{ marginTop: 4 }}>
        <div>
          <span style={{ fontSize: 13, color: "white" }} className="outline">
            Characters:
          </span>
          {searchActions !== "" && (
            <button
              className="button"
              style={{ fontWeight: "bolder", width: 40 }}
              onClick={() => {
                setSearchActions("");
              }}
            >
              Clear
            </button>
          )}
          <button
            className="button"
            style={{ fontWeight: "bolder", width: 80, float: "right" }}
            onClick={() => {
              addPlayer();
            }}
          >
            Add Character
          </button>

          {role === "GM" && (
            <button
              className="button"
              style={{
                fontWeight: "bolder",
                width: 100,
                float: "right",
                marginRight: 4,
              }}
              onClick={() => {
                addGMCharacter();
              }}
            >
              Add GM Character
            </button>
          )}
        </div>
        <hr />
        {playerList
          .sort((a, b) => {
            if (a.isGMPlayer && !b.isGMPlayer) return 1;
            if (!a.isGMPlayer && b.isGMPlayer) return -1;
            return 0;
          })
          .map((data) => {
            return playerItem(data);
          })}
      </div>
    );
  };

  const renderNav = () => {
    return (
      <div>
        <button
          className="button"
          style={{ marginLeft: 4, width: "auto", padding: 5 }}
          onClick={() => {
            setTab("stats");
          }}
        >
          Stats/Equipment
        </button>
        <button
          className="button"
          style={{ marginLeft: 4, width: "auto", padding: 5 }}
          onClick={() => {
            setTab("skills");
          }}
        >
          Skills/Spells
        </button>
        <button
          className="button"
          style={{ marginLeft: 4, width: "auto", padding: 5, marginRight: 20 }}
          onClick={() => {
            setTab("actions");
          }}
        >
          Actions/Rolls
        </button>
        <Text>HP:</Text>
        <input
          className="input-stat"
          style={{
            width: 20,
            color: "Red",
          }}
          readOnly={true}
          value={
            getDiceStat(player.attributes.mig) * 5 +
            player.stats.hpMod +
            player.traits.level
          }
        />
        <Text>MP: </Text>
        <input
          className="input-stat"
          style={{
            width: 20,
            color: "LightBlue",
          }}
          readOnly={true}
          value={
            getDiceStat(player.attributes.wil) * 5 +
            player.stats.mpMod +
            player.traits.level
          }
        />
        <Text>IP: </Text>
        <input
          className="input-stat"
          style={{
            width: 20,
            color: "Orange",
          }}
          readOnly={true}
          value={6 + player.stats.ipMod}
        />
        <button
          className="button"
          style={{
            marginLeft: 4,
            width: "auto",
            padding: 5,
            float: "right",
            color: "red",
          }}
          onClick={() => {
            setPlayer(null);
          }}
        >
          Close
        </button>
      </div>
    );
  };

  const renderInfo = () => {
    return (
      <>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <div style={{ width: 44 }}>
            <Text>Name: </Text>
          </div>
          <input
            className="input-stat"
            style={{
              width: 160,
              color: "white",
            }}
            value={player.traits.name}
            onChange={(evt) => {
              const playerGet = { ...player };
              playerGet.traits.name = evt.target.value;
              updatePlayer(playerGet);
            }}
            placeholder="Your name and pronouns"
          />
          <div style={{ width: 40 }}>
            <Text>Theme: </Text>
          </div>
          <input
            className="input-stat"
            style={{
              width: 70,
              color: "white",
            }}
            value={player.traits.theme}
            onChange={(evt) => {
              const playerGet = { ...player };
              playerGet.traits.theme = evt.target.value;
              updatePlayer(playerGet);
            }}
            placeholder="A strong ideal"
          />
          <div style={{ width: 35 }}>
            <Text>Origin: </Text>
          </div>
          <input
            className="input-stat"
            style={{
              width: 130,
              color: "white",
            }}
            value={player.traits.origin}
            onChange={(evt) => {
              const playerGet = { ...player };
              playerGet.traits.origin = evt.target.value;
              updatePlayer(playerGet);
            }}
            placeholder={"Where they are from"}
          />
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            paddingTop: 4,
            alignItems: "center",
          }}
        >
          <div style={{ width: 40 }}>
            <Text>Identity: </Text>
          </div>
          <input
            className="input-stat"
            style={{
              width: 380,
              color: "white",
            }}
            value={player.traits.identity}
            onChange={(evt) => {
              const playerGet = { ...player };
              playerGet.traits.identity = evt.target.value;
              updatePlayer(playerGet);
            }}
            placeholder="This is a short sentence that sums up your character's general concept"
          />

          <Text>LVL:</Text>
          <input
            className="input-stat"
            style={{
              width: 20,
              color: "white",
            }}
            type="number"
            value={player.traits.level}
            onChange={(evt) => {
              const playerGet = { ...player };
              playerGet.traits.level = parseInt(evt.target.value);
              updatePlayer(playerGet);
            }}
          />
        </div>
      </>
    );
  };

  const bond = (index) => {
    const bond = player.bonds[index];

    const updateBond = (bond, index) => {
      const playerGet = { ...player };
      playerGet.bonds[index] = bond;
      updatePlayer(playerGet);
    };

    return (
      <div>
        <input
          className="input-stat"
          style={{
            width: 45,
            color: "white",
            marginLeft: 0,
            fontSize: 8,
          }}
          value={bond.name}
          placeholder="Bond"
          onChange={(evt) => {
            const bondGet = { ...bond };
            bondGet.name = evt.target.value;
            updateBond(bondGet, index);
          }}
        />
        <select
          className="bond-stat"
          value={bond.emotionOne}
          onChange={(evt) => {
            const bondGet = { ...bond };
            bondGet.emotionOne = evt.target.value;
            updateBond(bondGet, index);
          }}
        >
          <option value=""></option>
          <option value="Admiration">Admiration</option>
          <option value="Inferiority">Inferiority</option>
        </select>
        <select
          className="bond-stat"
          value={bond.emotionTwo}
          onChange={(evt) => {
            const bondGet = { ...bond };
            bondGet.emotionTwo = evt.target.value;
            updateBond(bondGet, index);
          }}
        >
          <option value=""></option>
          <option value="Loyalty">Loyalty</option>
          <option value="Mistrust">Mistrust</option>
        </select>
        <select
          className="bond-stat"
          value={bond.emotionThree}
          onChange={(evt) => {
            const bondGet = { ...bond };
            bondGet.emotionThree = evt.target.value;
            updateBond(bondGet, index);
          }}
        >
          <option value=""></option>
          <option value="Affection">Affection</option>
          <option value="Hatred">Hatred</option>
        </select>
      </div>
    );
  };

  const renderBonds = () => {
    return (
      <div className="bonds">
        {bond(0)}
        {bond(1)}
        {bond(2)}
        {bond(3)}
        {bond(4)}
        {bond(5)}
      </div>
    );
  };

  const getCurrentAttribute = (attr) => {
    if (attr == "dex") {
      let stat = getDiceStat(player.attributes.dex);
      if (player.debuff.slow) {
        stat = stat - 2;
      }
      if (player.debuff.enraged) {
        stat = stat - 2;
      }
      if (stat < 6) stat = 6;
      return "d" + stat;
    }
    if (attr == "ins") {
      let stat = getDiceStat(player.attributes.ins);
      if (player.debuff.dazed) {
        stat = stat - 2;
      }
      if (player.debuff.enraged) {
        stat = stat - 2;
      }
      if (stat < 6) stat = 6;
      return "d" + stat;
    }
    if (attr == "mig") {
      let stat = getDiceStat(player.attributes.mig);
      if (player.debuff.weak) {
        stat = stat - 2;
      }
      if (player.debuff.poisoned) {
        stat = stat - 2;
      }
      if (stat < 6) stat = 6;
      return "d" + stat;
    }
    if (attr == "wil") {
      let stat = getDiceStat(player.attributes.wil);
      if (player.debuff.shaken) {
        stat = stat - 2;
      }
      if (player.debuff.poisoned) {
        stat = stat - 2;
      }
      if (stat < 6) stat = 6;
      return "d" + stat;
    }
  };

  const GMAttribute = (props) => {
    const { stat, label } = props;
    return (
      <div>
        <Text>
          {label}: {player.attributes["current" + stat]}
        </Text>
        <select
          className="attribute-stat"
          value={player.attributes[stat]}
          onChange={(evt) => {
            const playerGet = { ...player };
            player.attributes[stat] = evt.target.value;
            playerGet.attributes["current" + stat] = getCurrentAttribute(stat);
            updatePlayer(playerGet);
          }}
        >
          <option value="d12">d12</option>
          <option value="d10">d10</option>
          <option value="d8">d8</option>
          <option value="d6">d6</option>
        </select>
      </div>
    );
  };

  const GMCondition = (props) => {
    const { stat, condition } = props;
    return (
      <button
        className="button"
        style={{
          marginLeft: 4,
          fontSize: 8,
          width: 40,
          textTransform: "capitalize",
          backgroundColor: player.debuff[condition] ? "darkred" : "#222",
          color: player.debuff[condition] ? "white" : "#ffd433",
        }}
        onClick={() => {
          const playerGet = { ...player };
          playerGet.debuff[condition] = !player.debuff[condition];
          playerGet.attributes["current" + stat] = getCurrentAttribute(stat);
          updatePlayer(playerGet);
        }}
      >
        {condition}
      </button>
    );
  };

  const Attribute = (props) => {
    const { stat, condition, label } = props;
    return (
      <div>
        <div>
          <Text>{label}:</Text>
        </div>
        <select
          className="attribute-stat"
          value={player.attributes[stat]}
          onChange={(evt) => {
            const playerGet = { ...player };
            player.attributes[stat] = evt.target.value;
            playerGet.attributes["current" + stat] = getCurrentAttribute(stat);
            updatePlayer(playerGet);
          }}
        >
          <option value="d12">d12</option>
          <option value="d10">d10</option>
          <option value="d8">d8</option>
          <option value="d6">d6</option>
        </select>
        <span
          className="outline"
          style={{ display: "inline-block", width: 19, fontSize: 11 }}
        >
          {player.attributes["current" + stat]}
        </span>
        <button
          className="button"
          style={{
            marginLeft: 4,
            fontSize: 8,
            width: 40,
            textTransform: "capitalize",
            backgroundColor: player.debuff[condition] ? "darkred" : "#222",
            color: player.debuff[condition] ? "white" : "#ffd433",
          }}
          onClick={() => {
            const playerGet = { ...player };
            playerGet.debuff[condition] = !player.debuff[condition];
            playerGet.attributes["current" + stat] = getCurrentAttribute(stat);
            updatePlayer(playerGet);
          }}
        >
          {condition}
        </button>
      </div>
    );
  };

  const renderAttributes = () => {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "left",
          flexDirection: "column",
        }}
      >
        <Attribute stat="dex" label="Dexterity" condition="slow" />
        <Attribute stat="ins" label="Insight" condition="dazed" />
        <Attribute stat="mig" label="Might" condition="weak" />
        <Attribute stat="wil" label="Willpower" condition="shaken" />
      </div>
    );
  };

  const renderSecondaryCondition = () => {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "left",
          flexDirection: "column",
        }}
      >
        <button
          className="button"
          style={{
            marginTop: 50,
            marginLeft: 0,
            marginRight: 10,
            fontSize: 8,
            width: 40,
            textTransform: "capitalize",
            backgroundColor: player.debuff.enraged ? "darkred" : "#222",
            color: player.debuff.enraged ? "white" : "#ffd433",
          }}
          onClick={() => {
            const playerGet = { ...player };
            playerGet.debuff.enraged = !player.debuff.enraged;
            playerGet.attributes["currentdex"] = getCurrentAttribute("dex");
            playerGet.attributes["currentins"] = getCurrentAttribute("ins");
            updatePlayer(playerGet);
          }}
        >
          Enraged
        </button>
        <button
          className="button"
          style={{
            marginTop: 75,
            marginLeft: 0,
            marginRight: 10,
            fontSize: 8,
            width: 40,
            textTransform: "capitalize",
            backgroundColor: player.debuff.poisoned ? "darkred" : "#222",
            color: player.debuff.poisoned ? "white" : "#ffd433",
          }}
          onClick={() => {
            const playerGet = { ...player };
            playerGet.debuff.poisoned = !player.debuff.poisoned;
            playerGet.attributes["currentmig"] = getCurrentAttribute("mig");
            playerGet.attributes["currentwil"] = getCurrentAttribute("wil");
            updatePlayer(playerGet);
          }}
        >
          Poisoned
        </button>
      </div>
    );
  };

  const renderEquipment = () => {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "left",
          flexDirection: "column",
        }}
      >
        <div>
          <div>
            <Text>Accessory: </Text>
          </div>
          <input
            className="input-stat"
            style={{
              width: 312,
              color: "white",
              margin: 0,
              fontSize: 10,
            }}
            value={player.items.accessory}
            onChange={(evt) => {
              const playerGet = { ...player };
              playerGet.items.accessory = evt.target.value;
              updatePlayer(playerGet);
            }}
          />
        </div>
        <div>
          <div>
            <Text>Armor: </Text>
          </div>
          <input
            className="input-stat"
            style={{
              width: 312,
              color: "white",
              margin: 0,
              fontSize: 10,
            }}
            value={player.items.armor}
            onChange={(evt) => {
              const playerGet = { ...player };
              playerGet.items.armor = evt.target.value;
              updatePlayer(playerGet);
            }}
          />
        </div>
        <div>
          <div>
            <Text>Main Hand: </Text>
          </div>
          <input
            className="input-stat"
            style={{
              width: 312,
              color: "white",
              margin: 0,
              fontSize: 10,
            }}
            value={player.items.mainhand}
            onChange={(evt) => {
              const playerGet = { ...player };
              playerGet.items.mainhand = evt.target.value;
              updatePlayer(playerGet);
            }}
          />
        </div>
        <div>
          <div>
            <Text>Off Hand: </Text>
          </div>
          <input
            className="input-stat"
            style={{
              width: 312,
              color: "white",
              margin: 0,
              fontSize: 10,
            }}
            value={player.items.offhand}
            onChange={(evt) => {
              const playerGet = { ...player };
              playerGet.items.offhand = evt.target.value;
              updatePlayer(playerGet);
            }}
          />
        </div>
      </div>
    );
  };

  const renderItemStats = () => {
    return (
      <div>
        <Text>Defense: </Text>
        <input
          className="input-stat"
          type="number"
          style={{
            width: 20,
            color: "violet",
          }}
          value={player.stats.defense}
          onChange={(evt) => {
            const playerGet = { ...player };
            playerGet.stats.defense = parseInt(evt.target.value);
            updatePlayer(playerGet);
          }}
        />
        <Text>Magic Defense: </Text>
        <input
          className="input-stat"
          type="number"
          style={{
            width: 20,
            color: "cyan",
          }}
          value={player.stats.mDefense}
          onChange={(evt) => {
            const playerGet = { ...player };
            playerGet.stats.mDefense = parseInt(evt.target.value);
            updatePlayer(playerGet);
          }}
        />
        <Text>Initiative Modifier: </Text>
        <input
          className="input-stat"
          type="number"
          style={{
            width: 20,
            color: "lightgrey",
          }}
          value={player.stats.initMod}
          onChange={(evt) => {
            const playerGet = { ...player };
            if (evt.target.value != "") {
              playerGet.stats.initMod = parseInt(evt.target.value, "");
            } else playerGet.stats.initMod = "";
            updatePlayer(playerGet);
          }}
        />
        <Text>Fabula: </Text>
        <input
          className="input-stat"
          type="number"
          style={{
            width: 20,
            color: "Magenta",
          }}
          value={player.stats.fabula}
          onChange={(evt) => {
            const playerGet = { ...player };
            playerGet.stats.fabula = parseInt(evt.target.value);
            updatePlayer(playerGet);
          }}
        />
        <Text>Experience: </Text>
        <input
          className="input-stat"
          type="number"
          style={{
            width: 20,
            color: "lightgreen",
            marginRight: 0,
          }}
          value={player.stats.experience}
          onChange={(evt) => {
            const playerGet = { ...player };
            playerGet.stats.experience = parseInt(evt.target.value);
            updatePlayer(playerGet);
          }}
        />
      </div>
    );
  };

  const renderMartialUnlocked = () => {
    return (
      <div style={{ marginTop: 8 }}>
        <Text>Martial/Rituals: </Text>
        <input
          className="input-stat"
          style={{
            width: 182,
            color: "white",
          }}
          value={player.items.martialRitual}
          placeholder={"Melee/Armor/Ritualism/Elementalism/Etc."}
          onChange={(evt) => {
            const playerGet = { ...player };
            playerGet.items.martialRitual = evt.target.value;
            updatePlayer(playerGet);
          }}
        />
        <Text>Modifiers - </Text>
        <Text>HP: </Text>
        <input
          className="input-stat"
          type="number"
          style={{
            width: 20,
            color: "Red",
            marginRight: 4,
          }}
          value={player.stats.hpMod}
          onChange={(evt) => {
            const playerGet = { ...player };
            playerGet.stats.hpMod = parseInt(evt.target.value);
            updatePlayer(playerGet);
          }}
        />
        <Text>MP: </Text>
        <input
          className="input-stat"
          type="number"
          style={{
            width: 20,
            color: "LightBlue",
            marginRight: 4,
          }}
          value={player.stats.mpMod}
          onChange={(evt) => {
            const playerGet = { ...player };
            playerGet.stats.mpMod = parseInt(evt.target.value);
            updatePlayer(playerGet);
          }}
        />
        <Text
          style={{
            width: 20,
            color: "Orange",
            marginRight: 0,
          }}
        >
          IP:
        </Text>
        <input
          className="input-stat"
          type="number"
          style={{
            width: 20,
            color: "Orange",
            marginRight: 0,
          }}
          value={player.stats.ipMod}
          onChange={(evt) => {
            const playerGet = { ...player };
            playerGet.stats.ipMod = parseInt(evt.target.value);
            updatePlayer(playerGet);
          }}
        />
      </div>
    );
  };

  const renderNotes = () => {
    return (
      <textarea
        className="input-stat"
        rows="40"
        cols="89"
        style={{
          textAlign: "left",
          color: "#FFF",
          height: 150,
          margin: 0,
          width: 485,
          padding: 4,
        }}
        value={player.items.notes}
        onChange={(evt) => {
          const playerGet = { ...player };
          playerGet.items.notes = evt.target.value;
          updatePlayer(playerGet);
        }}
      ></textarea>
    );
  };

  const addSkill = (index) => {
    const playerGet = { ...player };
    playerGet.skills[index].items.push({ name: "", info: "", detail: "" }),
      updatePlayer(playerGet);
  };

  const removeSkill = (index, itemIndex) => {
    if (confirm("Are you sure you want to delete the skill?") == true) {
      const playerGet = { ...player };
      playerGet.skills[index].items.splice(itemIndex, 1);
      updatePlayer(playerGet);
    }
  };

  const skill = (data, index, itemIndex) => {
    return (
      <div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <Text>Name: </Text>
          <input
            className="input-stat"
            style={{
              width: 120,
              color: "lightgrey",
            }}
            value={data.name}
            placeholder="Skill/Spell/Arcana/Etc."
            onChange={(evt) => {
              const playerGet = { ...player };
              playerGet.skills[index].items[itemIndex].name = evt.target.value;
              updatePlayer(playerGet);
            }}
          />
          <Text>Info: </Text>
          <input
            className="input-stat"
            style={{
              width: 240,
              color: "lightgrey",
            }}
            value={data.info}
            placeholder="Level/Target/MP Cost/Duration/Damage/Other"
            onChange={(evt) => {
              const playerGet = { ...player };
              playerGet.skills[index].items[itemIndex].info = evt.target.value;
              updatePlayer(playerGet);
            }}
          />
          <button
            className="button"
            style={{ marginRight: 4 }}
            onClick={() => sendSkill(data)}
          >
            Show
          </button>
          <button
            className="button"
            style={{ width: 25, color: "darkred" }}
            onClick={() => {
              removeSkill(index, itemIndex);
            }}
          >
            ✖
          </button>
        </div>
        <textarea
          className="input-stat"
          rows="40"
          cols="88"
          style={{
            textAlign: "left",
            color: "#FFF",
            height: 50,
            marginLeft: 0,
            marginTop: 4,
            width: 485,
            padding: 4,
          }}
          placeholder="Add Description Here"
          onChange={(evt) => {
            const playerGet = { ...player };
            playerGet.skills[index].items[itemIndex].detail = evt.target.value;
            updatePlayer(playerGet);
          }}
          value={data.detail}
        ></textarea>
      </div>
    );
  };

  const addCategory = () => {
    const playerGet = { ...player };
    playerGet.skills.push({
      categoryName: "",
      categoryInfo: "",
      items: [{ name: "", info: "", detail: "" }],
    });
    updatePlayer(playerGet);
  };

  const removeCategory = (index) => {
    if (confirm("Are you sure you want to delete the category?") == true) {
      const playerGet = { ...player };
      playerGet.skills.splice(index, 1);
      updatePlayer(playerGet);
    }
  };

  const category = (data, index) => {
    const categorySearched =
      searchSkills !== "" &&
      data.categoryName.toLowerCase().includes(searchSkills.toLowerCase());

    let items = [];

    if (categorySearched) {
      items = data.items;
    } else {
      items = data.items.filter((item) => {
        if (searchSkills !== "") {
          if (item.name.toLowerCase().includes(searchSkills.toLowerCase())) {
            return true;
          } else return false;
        } else {
          return true;
        }
      });
    }

    if (searchSkills !== "" && items.length < 1 && searchSkills) {
      return "";
    }

    return (
      <div style={{ marginBottom: 20 }}>
        <hr />
        <div style={{ display: "flex", alignItems: "center" }}>
          <Text>Category: </Text>
          <input
            className="input-stat"
            style={{
              width: 200,
              color: "lightgrey",
            }}
            value={data.categoryName}
            placeholder="Class/Spells/Projects/Skills/Other"
            onChange={(evt) => {
              const playerGet = { ...player };
              playerGet.skills[index].categoryName = evt.target.value;
              updatePlayer(playerGet);
            }}
          />
          <Text>Info: </Text>
          <input
            className="input-stat"
            style={{
              width: 190,
              color: "lightgrey",
            }}
            value={data.categoryInfo}
            placeholder="Free Benefits/Tracker/Other"
            onChange={(evt) => {
              const playerGet = { ...player };
              playerGet.skills[index].categoryInfo = evt.target.value;
              updatePlayer(playerGet);
            }}
          />
          <div style={{ display: "flex", justifyContent: "center" }}>
            <button
              className="button"
              style={{ fontWeight: "bolder", width: 25, marginRight: 4 }}
              onClick={() => {
                addSkill(index);
              }}
            >
              +
            </button>
          </div>
          <button
            className="button"
            style={{ fontWeight: "bolder", width: 25, color: "darkred" }}
            onClick={() => {
              removeCategory(index);
            }}
          >
            ✖
          </button>
        </div>
        <hr style={{ marginBottom: 10 }} />
        {items.map((item, itemIndex) => {
          return skill(item, index, itemIndex);
        })}
      </div>
    );
  };

  const [searchSkills, setSearchSkills] = useState("");

  const renderCategory = () => {
    return (
      <div>
        <div>
          <Text>Search By Name: </Text>
          <input
            className="input-stat"
            style={{
              width: 150,
              color: "lightgrey",
            }}
            value={searchSkills}
            onChange={(evt) => {
              setSearchSkills(evt.target.value);
            }}
          />
          {searchSkills !== "" && (
            <button
              className="button"
              style={{ fontWeight: "bolder", width: 40 }}
              onClick={() => {
                setSearchSkills("");
              }}
            >
              Clear
            </button>
          )}
          <button
            className="button"
            style={{ fontWeight: "bolder", width: 80, float: "right" }}
            onClick={() => addCategory()}
          >
            Add Category
          </button>
        </div>

        {player.skills.map((item, index) => {
          return category(item, index);
        })}
      </div>
    );
  };

  const addAction = () => {
    const playerGet = { ...player };
    playerGet.actions.push({
      name: "",
      info: "",
      detail: "",
      diceOne: "dex",
      diceTwo: "dex",
      bonus: 0,
      damage: 0,
      useHR: true,
    });
    updatePlayer(playerGet);
  };

  const removeAction = (index) => {
    if (confirm("Are you sure you want to delete the action?") == true) {
      const playerGet = { ...player };
      playerGet.actions.splice(index, 1);
      updatePlayer(playerGet);
    }
  };

  const sortUp = (index) => {
    if (index !== 0) {
      const playerGet = { ...player };
      const actionOne = playerGet.actions[index];
      const actionTwo = playerGet.actions[index - 1];
      playerGet.actions[index] = actionTwo;
      playerGet.actions[index - 1] = actionOne;
      updatePlayer(playerGet);
    }
  };

  const sortDown = (index) => {
    if (index < player.actions.length - 1) {
      const playerGet = { ...player };
      const actionOne = playerGet.actions[index];
      const actionTwo = playerGet.actions[index + 1];
      playerGet.actions[index] = actionTwo;
      playerGet.actions[index + 1] = actionOne;
      updatePlayer(playerGet);
    }
  };

  const [searchActions, setSearchActions] = useState("");

  const action = (data, index) => {
    return (
      <div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <Text>Name: </Text>
          <input
            className="input-stat"
            style={{
              width: 120,
              color: "lightgrey",
            }}
            value={data.name}
            onChange={(evt) => {
              const playerGet = { ...player };
              playerGet.actions[index].name = evt.target.value;
              updatePlayer(playerGet);
            }}
          />
          <Text>Info: </Text>
          <input
            className="input-stat"
            style={{
              width: 258,
              color: "lightgrey",
            }}
            value={data.info}
            placeholder="Level/Target/MP Cost/Duration/Damage/Other/Quote"
            onChange={(evt) => {
              const playerGet = { ...player };
              playerGet.actions[index].info = evt.target.value;
              updatePlayer(playerGet);
            }}
          />

          <button
            className="button"
            style={{ width: 25, color: "darkred" }}
            onClick={() => {
              removeAction(index);
            }}
          >
            ✖
          </button>
        </div>
        <div style={{ display: "flex", alignItems: "center", marginTop: 4 }}>
          <Text>Dice 1: </Text>
          <select
            className="attribute-stat"
            value={data.diceOne}
            onChange={(evt) => {
              const playerGet = { ...player };
              playerGet.actions[index].diceOne = evt.target.value;
              updatePlayer(playerGet);
            }}
          >
            <option value="dex">DEX</option>
            <option value="ins">INS</option>
            <option value="mig">MIG</option>
            <option value="wil">WIL</option>
            <option value="d12">d12</option>
            <option value="d10">d10</option>
            <option value="d8">d8</option>
            <option value="d6">d6</option>
          </select>
          <Text>Dice 2: </Text>
          <select
            className="attribute-stat"
            value={data.diceTwo}
            onChange={(evt) => {
              const playerGet = { ...player };
              playerGet.actions[index].diceTwo = evt.target.value;
              updatePlayer(playerGet);
            }}
          >
            <option value="dex">DEX</option>
            <option value="ins">INS</option>
            <option value="mig">MIG</option>
            <option value="wil">WIL</option>
            <option value="d12">d12</option>
            <option value="d10">d10</option>
            <option value="d8">d8</option>
            <option value="d6">d6</option>
          </select>
          <Text>Modifier:</Text>
          <input
            className="input-stat"
            type="number"
            style={{
              width: 20,
              color: "lightblue",
            }}
            value={data.bonus}
            onChange={(evt) => {
              const playerGet = { ...player };
              playerGet.actions[index].bonus = evt.target.value;
              updatePlayer(playerGet);
            }}
          />
          <button
            className="button"
            style={{ marginRight: 4 }}
            onClick={() => {
              const playerGet = { ...player };
              playerGet.actions[index].useHR = !playerGet.actions[index].useHR;
              updatePlayer(playerGet);
            }}
          >
            {data.useHR ? "With HR" : "No HR"}
          </button>
          <Text>Damage:</Text>
          <input
            className="input-stat"
            type="number"
            style={{
              width: 20,
              color: "red",
            }}
            value={data.damage}
            onChange={(evt) => {
              const playerGet = { ...player };
              playerGet.actions[index].damage = evt.target.value;
              updatePlayer(playerGet);
            }}
          />
          <button
            className="button"
            style={{ marginRight: 4, width: 40 }}
            onClick={() => sendRoll(data)}
          >
            Roll
          </button>
          <button
            className="button"
            style={{ width: 25, marginRight: 4 }}
            onClick={() => {
              sortUp(index);
            }}
          >
            ↑
          </button>
          <button
            className="button"
            style={{ width: 25 }}
            onClick={() => {
              sortDown(index);
            }}
          >
            ↓
          </button>
        </div>
        <textarea
          className="input-stat"
          rows="40"
          cols="88"
          style={{
            textAlign: "left",
            color: "#FFF",
            height: 50,
            marginLeft: 0,
            marginTop: 4,
            width: 485,
            padding: 4,
          }}
          value={data.detail}
          onChange={(evt) => {
            const playerGet = { ...player };
            playerGet.actions[index].detail = evt.target.value;
            updatePlayer(playerGet);
          }}
        ></textarea>
        <hr />
      </div>
    );
  };

  const renderActionList = () => {
    const items = player.actions.filter((item) => {
      if (searchActions !== "") {
        if (item.name.toLowerCase().includes(searchActions.toLowerCase())) {
          return true;
        } else return false;
      } else {
        return true;
      }
    });
    return (
      <div>
        <div>
          <Text>Search By Name: </Text>
          <input
            className="input-stat"
            style={{
              width: 150,
              color: "lightgrey",
            }}
            value={searchActions}
            onChange={(evt) => {
              setSearchActions(evt.target.value);
            }}
          />
          {searchActions !== "" && (
            <button
              className="button"
              style={{ fontWeight: "bolder", width: 40 }}
              onClick={() => {
                setSearchActions("");
              }}
            >
              Clear
            </button>
          )}
          <button
            className="button"
            style={{ fontWeight: "bolder", width: 80, float: "right" }}
            onClick={() => {
              addAction();
            }}
          >
            Add Action
          </button>
        </div>
        <hr />

        {items.map((item, index) => {
          return action(item, index);
        })}
      </div>
    );
  };

  const renderGMNav = () => {
    return (
      <div>
        <div style={{ display: "flex", marginTop: 4 }}>
          <div style={{ width: 44 }}>
            <Text>Name: </Text>
          </div>
          <input
            className="input-stat"
            style={{
              width: 160,
              color: "white",
            }}
            value={player.traits.name}
            onChange={(evt) => {
              const playerGet = { ...player };
              playerGet.traits.name = evt.target.value;
              updatePlayer(playerGet);
            }}
            placeholder="Your Enemy Name"
          />

          <GMCondition stat="dex" condition="slow" />
          <GMCondition stat="ins" condition="dazed" />
          <GMCondition stat="mig" condition="weak" />
          <GMCondition stat="wil" condition="shaken" />
          <button
            className="button"
            style={{
              marginLeft: 4,
              fontSize: 8,
              width: 40,
              textTransform: "capitalize",
              backgroundColor: player.debuff.enraged ? "darkred" : "#222",
              color: player.debuff.enraged ? "white" : "#ffd433",
            }}
            onClick={() => {
              const playerGet = { ...player };
              playerGet.debuff.enraged = !player.debuff.enraged;
              playerGet.attributes["currentdex"] = getCurrentAttribute("dex");
              playerGet.attributes["currentins"] = getCurrentAttribute("ins");
              updatePlayer(playerGet);
            }}
          >
            Enraged
          </button>
          <button
            className="button"
            style={{
              marginLeft: 4,
              marginRight: 10,
              fontSize: 8,
              width: 40,
              textTransform: "capitalize",
              backgroundColor: player.debuff.poisoned ? "darkred" : "#222",
              color: player.debuff.poisoned ? "white" : "#ffd433",
            }}
            onClick={() => {
              const playerGet = { ...player };
              playerGet.debuff.poisoned = !player.debuff.poisoned;
              playerGet.attributes["currentmig"] = getCurrentAttribute("mig");
              playerGet.attributes["currentwil"] = getCurrentAttribute("wil");
              updatePlayer(playerGet);
            }}
          >
            Poisoned
          </button>
          <button
            className="button"
            style={{
              width: "auto",
              padding: 5,
              marginLeft: "auto",
              color: "red",
            }}
            onClick={() => {
              setPlayer(null);
            }}
          >
            Close
          </button>
        </div>
        <hr />
        <div style={{ display: "flex", gap: 10 }}>
          <GMAttribute stat="dex" label="Dexterity" />
          <GMAttribute stat="ins" label="Insight" />
          <GMAttribute stat="mig" label="Might" />
          <GMAttribute stat="wil" label="Willpower" />
        </div>
        <div></div>
      </div>
    );
  };

  return (
    <div
      style={{
        backgroundImage: `url(${landingBG})`,
        backgroundSize: "contain",
        height: 540,
        width: 550,
        overflow: "hidden",
      }}
    >
      <div
        className="scrollable-container"
        style={{
          overflow: "scroll",
          height: windowInnerHeight - 40,
          marginTop: 20,
          paddingLeft: 30,
          paddingRight: 30,
        }}
      >
        {player ? (
          <>
            {!player.isGMPlayer ? renderNav() : renderGMNav()}
            <hr />
            {tab === "stats" && (
              <div>
                {renderInfo()}
                <hr />
                {renderBonds()}
                <hr />
                {renderItemStats()}
                <div style={{ display: "flex" }}>
                  <div style={{ width: 120 }}>{renderAttributes()}</div>
                  <div>{renderSecondaryCondition()}</div>
                  <div>{renderEquipment()}</div>
                </div>
                {renderMartialUnlocked()}
                <hr />
                <div style={{ marginBottom: 8 }}>
                  <Text>Character Notes/Backpack</Text>
                  <span style={{ float: "right" }}>
                    <Text>Zenit: </Text>
                    <input
                      className="input-stat"
                      type="number"
                      style={{
                        width: 60,
                        color: "gold",
                        marginRight: 0,
                      }}
                      value={player.items.zenit}
                      onChange={(evt) => {
                        const playerGet = { ...player };
                        playerGet.items.zenit = parseInt(evt.target.value);
                        updatePlayer(playerGet);
                      }}
                    />
                  </span>
                </div>
                {renderNotes()}
              </div>
            )}
            {tab === "skills" && renderCategory()}
            {tab === "actions" && renderActionList()}
          </>
        ) : (
          <div>
            {renderPlayerList()}
            <div
              style={{ fontSize: 13, color: "White", marginTop: 20 }}
              className="outline"
            >
              Locally Saved Character:
            </div>
            <hr />
            {renderLocalPlayerList()}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
