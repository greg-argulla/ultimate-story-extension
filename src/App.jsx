/* eslint-disable react/prop-types */
import { useState, useEffect, useRef } from "react";
import OBR from "@owlbear-rodeo/sdk";
import landingBG from "./assets/bg.jpg";
import layout from "../layout.json";
import "./App.css";

const debuffList = [
  {
    name: "slow",
    label: "Slow",
    url: "https://images.owlbear.rodeo/691aa845-022d-4c0f-948f-4bfc5a4037f3/items/a7dd52d4-6064-4f32-a742-27adc8c77cda.png",
  },
  {
    name: "dazed",
    label: "Dazed",
    url: "https://images.owlbear.rodeo/691aa845-022d-4c0f-948f-4bfc5a4037f3/items/6ad33f4f-c756-4320-b62b-8c4719a3f294.png",
  },
  {
    name: "weak",
    label: "Weak",
    url: "https://images.owlbear.rodeo/691aa845-022d-4c0f-948f-4bfc5a4037f3/items/01fc0c8b-68b9-40a3-859c-680edde55008.png",
  },
  {
    name: "shaken",
    label: "Shaken",
    url: "https://images.owlbear.rodeo/691aa845-022d-4c0f-948f-4bfc5a4037f3/items/21a042d4-1b16-4984-96bb-79117db6b4e5.png",
  },
  {
    name: "enraged",
    label: "Enraged",
    url: "https://images.owlbear.rodeo/691aa845-022d-4c0f-948f-4bfc5a4037f3/items/88cdb66c-9926-4d5d-9f7e-4fb51c95858a.png",
  },

  {
    name: "poisoned",
    label: "Poisoned",
    url: "https://images.owlbear.rodeo/691aa845-022d-4c0f-948f-4bfc5a4037f3/items/283a97c9-cf33-411b-a105-6c605d7d3b25.png",
  },
];

const Text = (props) => {
  const { children } = props;
  return <span className="outline">{children}</span>;
};

const readFile = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsText(file, "utf-8");
    reader.onload = () => {
      try {
        const { result } = reader;
        if (!result) reject();
        resolve(JSON.parse(result));
      } catch (error) {
        reject();
      }
    };
  });

const newPlayer = (isGMPlayer) => {
  if (isGMPlayer) {
    return {
      id: Date.now(),
      isGMPlayer: isGMPlayer,
      name: "",
      traits: {
        name: "",
      },
      affinities: {},
      stats: {
        defense: 0,
        mDefense: 0,
        currentHP: 0,
        currentMP: 0,
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
      linkedStats: {
        currentStats: "",
      },
    };
  }

  return {
    id: Date.now(),
    name: "",
    level: 5,
    traits: {
      name: "",
      identity: "",
      theme: "",
      origin: "",
      avatar: "",
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
      martialDef: false,
      defenseMod: 0,
      defense: 8,
      defenseMartial: 8,
      mDefenseMod: 2,
      mDefense: 8,
      initMod: 0,
      hpMod: 0,
      mpMod: 0,
      ipMod: 0,
      fabula: 3,
      experience: 0,
      currentHP: 45,
      currentMP: 45,
      currentIP: 6,
      maxHP: 45,
      maxMP: 45,
      maxIP: 6,
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
        categoryName: "Sample Category",
        categoryInfo: "Sample Side Information",
        items: [
          {
            name: "Sample Item",
            info: '"Come at me!"',
            detail:
              "Add your details here. \n\n *This text is highlighted in red* \n\n `This text is highlighted in yellow` \n\n Use the format below to add images \n <https://64.media.tumblr.com/65b2b9c388b86da9e30c14778600f2ff/tumblr_ncxgi0ieoI1qkye4lo4_400.gif> \n\n Use the format below to add animations \n @83@ \n\n Use the format below to add a sound effect \n $https://static.wikia.nocookie.net/feheroes_gamepedia_en/images/8/84/Battle_2.flac",
          },
        ],
      },
      {
        categoryName: "",
        categoryInfo: "",
        items: [{ name: "", info: "", detail: "" }],
      },
    ],
    actions: [
      {
        name: "Sample Action",
        info: '"You are dead!"',
        detail:
          "Add your details here. \n\n *This text is highlighted in red* \n\n `This text is highlighted in yellow` \n\n Use the format below to add images \n <https://i0.wp.com/drunkenanimeblog.com/wp-content/uploads/2019/06/log-horizon.gif?fit=500%2C247> \n\n Use the format below to add animations \n @83@ \n\n Use the format below to add a sound effect \n $https://static.wikia.nocookie.net/feheroes_gamepedia_en/images/8/84/Battle_2.flac$",
        diceOne: "dex",
        diceTwo: "dex",
        bonus: 1,
        damage: 10,
        useHR: true,
      },
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
    linkedStats: {
      currentHP: "",
      currentMP: "",
      currentIP: "",
      defense: "",
      mDefense: "",
      fabula: "",
    },
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

function App(props) {
  const { adversaryOnly } = props;
  const [isOBRReady, setIsOBRReady] = useState(false);
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [playerList, setPlayerList] = useState([]);
  const [savedPlayerList, setSavePlayerList] = useState([]);
  const [player, setPlayer] = useState(null);
  const [tab, setTab] = useState("stats");
  const [role, setRole] = useState("PLAYER");
  const [exportData, setExportData] = useState(null);
  const [importData, setImportData] = useState("");
  const [copyText, setCopyText] = useState(false);
  const [metadataUpdate, setMetadata] = useState([]);
  const [cookiesNotEnabled, setCookiesNotEnabled] = useState(false);
  const [bonus, setBonus] = useState(0);
  const [healthModifier, setHealthModifier] = useState(0);
  const [mindModifier, setMindModifier] = useState(0);
  const [editMode, setEditMode] = useState(false);
  const [diceOne, setDiceOne] = useState("");
  const [diceTwo, setDiceTwo] = useState("");
  const [message, setMessage] = useState("");
  const [ignoreFirstUpdate, setIgnoreFirstUpdate] = useState(false);
  const uploaderRef = useRef(null);

  useEffect(() => {
    if (adversaryOnly && !player && playerList) {
      const adversaries = playerList
        .filter((item) => item.isGMPlayer)
        .sort((a, b) => a.traits.name.localeCompare(b.traits.name));

      if (adversaries.length === 0) return;

      setTab("actions");
      setDiceOne("");
      setDiceTwo("");
      setHealthModifier(0);
      setMindModifier(0);
      setBonus(0);
      setEditMode(false);
      setPlayer(adversaries[0]);
      sendCharacter(adversaries[0]);
    }
  }, [playerList]);

  useEffect(() => {
    OBR.onReady(async () => {
      OBR.scene.onReadyChange(async (ready) => {
        if (ready) {
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
        } else {
          setIsOBRReady(false);
          setPlayer(null);
        }
      });

      if (await OBR.scene.isReady()) {
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
      }
    });

    try {
      localStorage.getItem("ultimate.story.extension/metadata");
    } catch {
      setCookiesNotEnabled(true);
    }
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

      OBR.scene.onReadyChange(async (ready) => {
        if (ready) {
          const metadata = await OBR.scene.getMetadata();
          if (metadata["ultimate.story.extension/metadata"]) {
            const playerListGet = await createPlayerList(metadata);
            setPlayerList(playerListGet);
          }
        }
      });

      try {
        const localPlayerList = JSON.parse(
          localStorage.getItem("ultimate.story.extension/metadata")
        );
        setSavePlayerList(localPlayerList);
      } catch {
        setCookiesNotEnabled(true);
      }
    }
  }, [isOBRReady]);

  const showMessage = (messageGet) => {
    setMessage(messageGet);

    setTimeout(() => {
      setMessage("");
    }, 2500);
  };

  function calcHP(npc) {
    let hp = 2 * npc.lvl + 5 * npc.attributes.might;

    // Skill Extra HP
    if (npc.extra?.hp) {
      hp += parseInt(npc.extra.hp);
    }

    // Rank
    if (npc.rank === "elite" || npc.rank === "champion2") {
      hp = hp * 2;
    }

    if (npc.rank === "champion3") {
      hp = hp * 3;
    }

    if (npc.rank === "champion4") {
      hp = hp * 4;
    }

    if (npc.rank === "champion5") {
      hp = hp * 5;
    }

    if (npc.rank === "companion") {
      const sl = npc.companionlvl || 1;
      const lvl = npc.companionpclvl || 5;
      hp = sl * npc.attributes.might + Math.floor(lvl / 2);
    }

    return hp;
  }

  function calcMP(npc) {
    let mp = npc.lvl + 5 * npc.attributes.will;
    // Skill Extra MP
    if (npc.extra?.mp) {
      mp += parseInt(npc.extra.mp);
    }
    // Rank
    if (
      npc.rank === "champion2" ||
      npc.rank === "champion3" ||
      npc.rank === "champion4" ||
      npc.rank === "champion5"
    ) {
      mp = mp * 2;
    }

    return mp;
  }

  const rankDictionary = {
    soldier: "Solider",
    elite: "Elite",
    champion2: "Champion (2)",
    champion3: "Champion (3)",
    champion4: "Champion (4)",
    champion5: "Champion (5)",
  };

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const addGMCharacter = async () => {
    const playerGet = newPlayer(true);

    const metadataData = await OBR.scene.getMetadata();
    const metadata = metadataData["ultimate.story.extension/metadata"];
    let metadataChange = { ...metadata };
    metadataChange[playerGet.id] = playerGet;

    OBR.scene.setMetadata({
      "ultimate.story.extension/metadata": metadataChange,
    });
    showMessage(`Added GM character!`);
  };

  const ImportFultimatorJSON = async (npc) => {
    const playerGet = newPlayer(true);

    const actionsFromNpc = [];

    const attributeMap = {
      dexterity: "dex",
      insight: "ins",
      might: "mig",
      will: "wil",
    };

    if (!npc.extra) {
      npc.extra = {};
    }

    if (npc.description) {
      actionsFromNpc.push({
        name: npc.name,
        detail: npc.description,
        noDice: true,
      });
    }

    if (npc.traits) {
      actionsFromNpc.push({
        name: "Enemy Study Check 7+",
        info: "Rank/Species/Max HP/Max MP",
        detail:
          "LVL `" +
          npc.lvl +
          "` `" +
          (rankDictionary[npc.rank] ? rankDictionary[npc.rank] : "Solider") +
          "` | `" +
          capitalizeFirstLetter(npc.species) +
          "`\n" +
          "Max HP: *" +
          calcHP(npc) +
          "* / Max MP: *" +
          calcMP(npc) +
          "*",
        noDice: true,
      });
    }

    let def = 0;
    if (npc.armor) {
      if (npc.armor.def) {
        def =
          npc.armor.def + npc.extra.def
            ? npc.extra.def
            : 0 - npc.attributes.dexterity;
      } else {
        def = npc.armor.defbonus + (npc.extra.def ? npc.extra.def : 0);
      }
    } else {
      def = npc.extra.def ? npc.extra.def : 0;
    }

    let affinities = "";

    damageTypes.forEach((type, index) => {
      affinities +=
        (index > 0 ? "\n" : "") +
        affinityDictionary[npc.affinities[type] ? npc.affinities[type] : "na"] +
        `\`${type}\``;
    });

    let mDef = 0;
    if (npc.armor) {
      if (npc.armor.mdefbonus) {
        mDef = npc.armor.mdefbonus + (npc.extra.mDef ? npc.extra.mDef : 0);
      }
    } else {
      mDef = npc.extra.mDef ? npc.extra.mDef : 0;
    }

    if (npc.traits) {
      actionsFromNpc.push({
        name: "Enemy Study Check 10+",
        info: "Traits/Attributes/Defense/Magic Defense/Damage",
        detail:
          "Traits: `" +
          npc.traits +
          "`\n Attributes: `DEX:" +
          npc.attributes.dexterity +
          " INS:" +
          npc.attributes.insight +
          " MIG:" +
          npc.attributes.might +
          " WIL:" +
          npc.attributes.will +
          "`\nDEF: *" +
          (def + npc.attributes.dexterity) +
          "* M.DEF: *" +
          (mDef + +npc.attributes.insight) +
          "*\n" +
          affinities,
        noDice: true,
      });
    }

    if (npc.attacks) {
      npc.attacks.map((attack) => {
        actionsFromNpc.push({
          name: attack.name,
          info:
            attack.type.charAt(0).toUpperCase() +
            attack.type.slice(1) +
            " - " +
            (attack.range === "distance" ? "Ranged" : "Melee"),
          detail: attack.special.length
            ? attack.special.reduce((prev, current) => prev + " " + current)
            : "",
          diceOne: attributeMap[attack.attr1],
          diceTwo: attributeMap[attack.attr2],
          bonus: Math.floor(npc.lvl / 10) + (npc.extra.precision ? 3 : 0),
          damage:
            5 + (attack.extraDamage ? 5 : 0) + Math.floor(npc.lvl / 20) * 5,
          useHR: true,
        });
      });
    }

    if (npc.weaponattacks) {
      npc.weaponattacks.map((attack) => {
        actionsFromNpc.push({
          name: attack.name
            ? attack.name + ` (${attack.weapon.name})`
            : attack.weapon.name,
          info:
            attack.weapon.type.charAt(0).toUpperCase() +
            attack.weapon.type.slice(1) +
            " - " +
            (attack.weapon.range === "distance" ? "Ranged" : "Melee"),
          detail: attack.special.length
            ? attack.special.reduce((prev, current) => prev + " " + current)
            : "",
          diceOne: attributeMap[attack.weapon.att1],
          diceTwo: attributeMap[attack.weapon.att2],
          bonus:
            Math.floor(npc.lvl / 10) +
            (npc.extra.precision ? 3 : 0) +
            (attack.weapon.prec ? attack.weapon.prec : 0),
          damage:
            attack.weapon.damage +
            (attack.extraDamage ? 5 : 0) +
            (attack.flatdmg ? parseInt(attack.flatdmg) : 0) +
            Math.floor(npc.lvl / 20) * 5,
          useHR: true,
        });
      });
    }

    if (npc.spells) {
      npc.spells.map((attack) => {
        if (attack.type === "offensive") {
          actionsFromNpc.push({
            name: attack.name,
            info:
              "Spell - " +
              attack.mp +
              " MP - " +
              attack.target.charAt(0).toUpperCase() +
              attack.target.slice(1) +
              " - " +
              attack.duration.charAt(0).toUpperCase() +
              attack.duration.slice(1),
            detail: "(*ϟ*) " + attack.effect,
            diceOne: attributeMap[attack.attr1],
            diceTwo: attributeMap[attack.attr2],
            bonus: Math.floor(npc.lvl / 10) + (npc.extra.magic ? 3 : 0),
            damage: 0,
            useHR: true,
          });
        } else {
          actionsFromNpc.push({
            name: attack.name,
            info:
              "Spell - " +
              attack.mp +
              " MP - " +
              attack.target.charAt(0).toUpperCase() +
              attack.target.slice(1) +
              " - " +
              attack.duration.charAt(0).toUpperCase() +
              attack.duration.slice(1),
            detail: attack.effect,
            noDice: true,
          });
        }
      });
    }

    if (npc.actions) {
      npc.actions.map((action) => {
        actionsFromNpc.push({
          name: action.name,
          info: "Other Action",
          detail: action.effect,
          noDice: true,
        });
      });
    }

    if (npc.special) {
      npc.special.map((special) => {
        actionsFromNpc.push({
          name: special.name,
          info: "Special Rules",
          detail: special.effect,
          noDice: true,
        });
      });
    }

    const playerToImport = {
      ...playerGet,
      name: npc.name,
      traits: { name: npc.name },
      stats: {
        defense: def,
        mDefense: mDef,
        currentHP: 0,
        currentMP: 0,
      },
      affinities: npc.affinities,
      attributes: {
        dex: "d" + npc.attributes.dexterity,
        ins: "d" + npc.attributes.insight,
        mig: "d" + npc.attributes.might,
        wil: "d" + npc.attributes.will,
        currentdex: "d" + npc.attributes.dexterity,
        currentins: "d" + npc.attributes.insight,
        currentmig: "d" + npc.attributes.might,
        currentwil: "d" + npc.attributes.will,
      },
      actions: actionsFromNpc,
    };

    console.log("+++++++++++");
    console.log(npc);

    console.log(playerToImport);

    const metadataData = await OBR.scene.getMetadata();
    const metadata = metadataData["ultimate.story.extension/metadata"];
    let metadataChange = { ...metadata };
    metadataChange[playerToImport.id] = playerToImport;

    OBR.scene.setMetadata({
      "ultimate.story.extension/metadata": metadataChange,
    });
    if (!uploaderRef.current) return;
    uploaderRef.current.value = "";
    showMessage(`Added GM character!`);
  };

  const updateNoteItem = async (id, value, key, max) => {
    if (id === "") return;
    const valueGet = isNaN(value) ? 0 : value;
    const maxGet = isNaN(max) ? 0 : max;
    await OBR.scene.items.updateItems([id], (images) => {
      for (let image of images) {
        if (key === "defense" || key === "mDefense") {
          const format =
            valueGet > 9 ? valueGet.toString() : " " + valueGet.toString();

          const fontSize = valueGet > 9 ? 13 : 15;
          image.text.richText[0].children[0].text = format;
          image.text.style.fontSize = fontSize;
        } else if (key === "fabula") {
          const format =
            valueGet > 9 ? valueGet.toString() : " " + valueGet.toString();
          image.text.richText[0].children[0].text = format;
        } else if (maxGet) {
          image.text.richText[0].children[0].text =
            valueGet.toString() + "/" + maxGet.toString();
        } else {
          image.text.richText[0].children[0].text = valueGet.toString();
        }
      }
    });
  };

  const updateGMNoteItem = async (id, hp, mp, name) => {
    if (id === "") return;
    const hpGet = isNaN(hp) ? 0 : hp;
    const mpGet = isNaN(mp) ? 0 : mp;
    await OBR.scene.items.updateItems([id], (images) => {
      for (let image of images) {
        image.text.richText[0] = {
          type: "paragraph",
          children: [{ text: name }],
        };
        image.text.richText[1] = {
          type: "paragraph",
          children: [{ text: "           " + hpGet.toString() }],
        };
        image.text.richText[2] = {
          type: "paragraph",
          children: [{ text: "           " + mpGet.toString() }],
        };
      }
    });
  };

  const linkItem = (label, stat) => {
    return (
      <div>
        <span
          className="outline"
          style={{ display: "inline-block", width: 80 }}
        >
          {label}
        </span>
        <input
          className="input-stat"
          style={{
            width: 200,
            color: "white",
          }}
          value={player.linkedStats[stat]}
          readOnly={true}
        />
        <button
          className="button"
          style={{
            width: 96,
            padding: 5,
            marginRight: 4,
            marginLeft: "auto",
          }}
          onClick={async () => {
            const selected = await OBR.player.getSelection();
            if (selected && selected[0]) {
              const playerGet = { ...player };
              playerGet.linkedStats[stat] = selected[0];

              updateNoteItem(
                playerGet.linkedStats[stat],
                playerGet.stats[stat],
                stat,
                stat === "currentHP"
                  ? playerGet.stats.maxHP
                  : stat === "currentMP"
                  ? playerGet.stats.maxMP
                  : null
              );
              updatePlayer(playerGet);
            }
          }}
        >
          Link Selected Item
        </button>

        <button
          className="button"
          style={{
            width: 50,
            padding: 5,
            marginRight: 4,
            marginLeft: "auto",
          }}
          onClick={async () => {
            const playerGet = { ...player };
            playerGet.linkedStats[stat] = "";
            updatePlayer(playerGet);
          }}
        >
          Clear
        </button>
      </div>
    );
  };

  const renderLinkStats = () => {
    if (!player.linkedStats) {
      const playerGet = { ...player };
      playerGet.linkedStats = {
        currentHP: "",
        currentMP: "",
        currentIP: "",
        defense: "",
        mDefense: "",
        fabula: "",
      };
      updatePlayer(playerGet);
      return;
    }

    return (
      <>
        {linkItem("Current HP:", "currentHP")}
        {linkItem("Current MP:", "currentMP")}
        {linkItem("Current IP:", "currentIP")}
        {linkItem("Defense:", "defense")}
        {linkItem("Magic Defense:", "mDefense")}
        {linkItem("Fabula Points :", "fabula")}

        <hr></hr>
        <Text>
          Instructions: Select one item then press 'Link Selected Item' to sync
          text value of item to stats.
        </Text>
      </>
    );
  };

  const [timeoutID, setTimeoutID] = useState(null);

  const updatePlayer = (playerGet) => {
    setPlayer(playerGet);
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
    setIgnoreFirstUpdate(true);
  };

  const savePlayer = async () => {
    if (player) {
      const metadataData = await OBR.scene.getMetadata();
      const metadata = metadataData["ultimate.story.extension/metadata"];
      let metadataChange = { ...metadata };
      metadataChange[player.id] = { ...player, lastEdit: id };

      OBR.scene.setMetadata({
        "ultimate.story.extension/metadata": metadataChange,
      });
      setTimeoutID(null);
    }
  };

  useEffect(() => {
    if (player && !ignoreFirstUpdate && metadataUpdate[player.id]) {
      if (metadataUpdate[player.id].lastEdit !== id) {
        setPlayer(metadataUpdate[player.id]);
      }
    }
    if (ignoreFirstUpdate) {
      setIgnoreFirstUpdate(false);
    }
  }, [metadataUpdate]);

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
      characterName: player.traits.name,
      characterID: player.id,
      isGMPlayer: player.isGMPlayer,
      id: Date.now(),
    };
    OBR.room.setMetadata({
      "ultimate.story.extension/sendroll": rollData,
    });
    showMessage("Roll Sent!");
  };

  const sendSkill = (skill) => {
    const skillData = {
      skillName: skill.name ? skill.name : "Blank skill",
      info: skill.info,
      detail: skill.detail,
      characterName: player.traits.name,
      userId: id,
      username: name,
      characterID: player.id,
      id: Date.now(),
    };
    OBR.room.setMetadata({
      "ultimate.story.extension/sendskill": skillData,
    });
    showMessage("Information Sent!");
  };

  const sendCharacter = (playerGet) => {
    const characterData = {
      characterName: playerGet.traits.name,
      avatar: playerGet.traits.avatar,
      userId: id,
      characterID: playerGet.id,
      dex: playerGet.attributes.currentdex,
      ins: playerGet.attributes.currentins,
      mig: playerGet.attributes.currentmig,
      wil: playerGet.attributes.currentwil,
      isGMPlayer: playerGet.isGMPlayer,
      id: Date.now(),
    };
    OBR.room.setMetadata({
      "ultimate.story.extension/sendcharacter": characterData,
    });
  };

  const removePlayer = async (id) => {
    const metadataData = await OBR.scene.getMetadata();
    const metadata = metadataData["ultimate.story.extension/metadata"];
    let metadataChange = { ...metadata };

    if (metadataChange[id].isGMPlayer) {
      delete metadataChange[id];

      OBR.scene.setMetadata({
        "ultimate.story.extension/metadata": metadataChange,
      });
      showMessage(`Removed character.`);
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
          showMessage(`Removed character.`);
        }
      }
    }
  };

  const addPlayer = async () => {
    const playerGet = newPlayer();
    const metadataData = await OBR.scene.getMetadata();
    const metadata = metadataData["ultimate.story.extension/metadata"];
    let metadataChange = { ...metadata };
    metadataChange[playerGet.id] = playerGet;

    OBR.scene.setMetadata({
      "ultimate.story.extension/metadata": metadataChange,
    });
    showMessage(`Added new character.`);
  };

  const removeItemFromArray = (array, text) => {
    const index = array.indexOf(text);
    if (index > -1) {
      array.splice(index, 1);
    }
    return array;
  };

  function compareKeys(a, b) {
    var aKeys = Object.keys(a).sort();
    var bKeys = Object.keys(b).sort();
    aKeys = removeItemFromArray(aKeys, "lastEdit");
    bKeys = removeItemFromArray(bKeys, "lastEdit");
    aKeys = removeItemFromArray(aKeys, "isGMPlayer");
    bKeys = removeItemFromArray(bKeys, "isGMPlayer");
    aKeys = removeItemFromArray(aKeys, "linkedStats");
    bKeys = removeItemFromArray(bKeys, "linkedStats");
    return JSON.stringify(aKeys) === JSON.stringify(bKeys);
  }

  const importCharacter = () => {
    const localPlayerList = JSON.parse(
      localStorage.getItem("ultimate.story.extension/metadata")
    );

    const data = JSON.parse(importData);

    if (compareKeys(data, newPlayer())) {
      if (localPlayerList) {
        localPlayerList.push(data);
        localStorage.setItem(
          "ultimate.story.extension/metadata",
          JSON.stringify(localPlayerList)
        );

        setSavePlayerList(localPlayerList);
      } else {
        localStorage.setItem(
          "ultimate.story.extension/metadata",
          JSON.stringify(data)
        );
        setSavePlayerList(data);
      }
      setPlayer(null);
      setImportData("");
      setTab("stats");
      showMessage(`Imported character.`);
    } else {
      alert(
        "Invalid Data. Please double check the export data and copy again."
      );
    }
  };

  const saveCharacterLocally = async (id) => {
    const metadataData = await OBR.scene.getMetadata();
    const metadata = metadataData["ultimate.story.extension/metadata"];
    let metadataChange = { ...metadata };

    const localPlayerList = JSON.parse(
      localStorage.getItem("ultimate.story.extension/metadata")
    );

    if (localPlayerList) {
      const foundIndex = localPlayerList.findIndex((item) => {
        if (item) return id === item.id;
      });

      if (foundIndex !== -1) {
        localPlayerList[foundIndex] = metadataChange[id];

        localStorage.setItem(
          "ultimate.story.extension/metadata",
          JSON.stringify(localPlayerList)
        );
        setSavePlayerList(localPlayerList);
      } else if (localPlayerList) {
        if (metadataChange[id]) {
          localPlayerList.push(metadataChange[id]);
          localStorage.setItem(
            "ultimate.story.extension/metadata",
            JSON.stringify(localPlayerList)
          );
          setSavePlayerList(localPlayerList);
        }
      } else {
        localStorage.setItem(
          "ultimate.story.extension/metadata",
          JSON.stringify([metadataChange[id]])
        );
        setSavePlayerList([metadataChange[id]]);
      }
    } else {
      localStorage.setItem(
        "ultimate.story.extension/metadata",
        JSON.stringify([metadataChange[id]])
      );
      setSavePlayerList([metadataChange[id]]);
    }

    showMessage(`Character Saved!`);
  };

  const loadLocalCharacter = async (data) => {
    const metadataData = await OBR.scene.getMetadata();
    const metadata = metadataData["ultimate.story.extension/metadata"];
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

    showMessage(`Loaded character!`);
  };

  const removeCharacterLocally = (id) => {
    if (
      confirm(
        "Are you sure you want to delete this locally stored character?"
      ) == true
    ) {
      const localPlayerList = JSON.parse(
        localStorage.getItem("ultimate.story.extension/metadata")
      );

      const index = localPlayerList.findIndex((item) => item.id === id);
      localPlayerList.splice(index, 1);
      localStorage.setItem(
        "ultimate.story.extension/metadata",
        JSON.stringify(localPlayerList)
      );
      setSavePlayerList(localPlayerList);
      showMessage(`Deleted character.`);
    }
  };

  const duplicateGMCharacter = async (playerGet) => {
    const count = playerList.filter((item) => {
      return item.originalId === playerGet.id;
    }).length;

    playerGet.originalId = playerGet.id;
    playerGet.id = Date.now();

    playerGet.traits.name =
      playerGet.traits.name.replace(/ *\([^)]*\) */g, "") +
      (count > 0 ? ` (${count + 1})` : "");

    if (playerGet.stats) {
      playerGet.stats.currentHP = 0;
      playerGet.stats.currentMP = 0;
    } else {
      playerGet.stats = {
        defense: 0,
        mDefense: 0,
        currentHP: 0,
        currentMP: 0,
      };
    }
    playerGet.linkedStats = { currentStats: "" };
    const metadataData = await OBR.scene.getMetadata();
    const metadata = metadataData["ultimate.story.extension/metadata"];
    let metadataChange = { ...metadata };
    metadataChange[playerGet.id] = playerGet;

    OBR.scene.setMetadata({
      "ultimate.story.extension/metadata": metadataChange,
    });
    showMessage(`Added GM character!`);
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
      <div key={index}>
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
              width: 100,
              textAlign: "center",
              padding: 4,
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {data.traits ? data.traits.name : ""}
          </span>

          <Text>Identity: </Text>

          <input
            className="input-stat"
            style={{
              width: 180,
              color: "white",
            }}
            value={data.traits.identity}
            readOnly={true}
          />
          <button
            className="button"
            style={{
              width: 40,
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
              width: 40,
              padding: 5,
              marginRight: 4,
              marginLeft: "auto",
            }}
            onClick={() => {
              setTab("export");
              setExportData(JSON.stringify(data));
              setCopyText(false);
            }}
          >
            Export
          </button>
          <button
            className="button"
            style={{
              fontWeight: "bolder",
              width: 25,
              color: "darkred",
            }}
            onClick={() => {
              removeCharacterLocally(data.id);
            }}
          >
            ✖
          </button>
        </div>
        <hr />
      </div>
    );
  };

  const localAdversaryItem = (data, index) => {
    return (
      <div key={index}>
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
              width: 112,
              textAlign: "center",
              padding: 4,
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {data.traits ? data.traits.name : ""}
          </span>
          <button
            className="button"
            style={{
              width: 60,
              padding: 5,
              marginRight: 4,
            }}
            onClick={async () => {
              duplicateGMCharacter({ ...data });
            }}
          >
            Add
          </button>
          <button
            className="button"
            style={{
              fontWeight: "bolder",
              width: 25,
              color: "darkred",
            }}
            onClick={() => {
              removeCharacterLocally(data.id);
            }}
          >
            ✖
          </button>
        </div>
        <hr />
      </div>
    );
  };

  const renderLocalAdversaryList = () => {
    if (savedPlayerList) {
      if (savedPlayerList.length) {
        return (
          <div style={{ display: "flex", columnGap: 6 }}>
            <div>
              {savedPlayerList
                .filter((item) => {
                  if (item) return item.isGMPlayer;
                })
                .sort((a, b) => a.traits.name.localeCompare(b.traits.name))
                .map((data, index) => {
                  if (index % 2 === 0) return localAdversaryItem(data, index);
                  else return "";
                })}
            </div>
            <div>
              {savedPlayerList
                .filter((item) => {
                  if (item) return item.isGMPlayer;
                })
                .sort((a, b) => a.traits.name.localeCompare(b.traits.name))
                .map((data, index) => {
                  if (index % 2 === 1) return localAdversaryItem(data, index);
                  else return "";
                })}
            </div>
          </div>
        );
      }
    }
    return "";
  };

  const renderLocalPlayerList = () => {
    if (savedPlayerList) {
      if (savedPlayerList.length) {
        return savedPlayerList
          .filter((item) => {
            if (item) return !item.isGMPlayer;
          })
          .sort((a, b) => a.traits.name.localeCompare(b.traits.name))
          .map((data, index) => {
            return localPlayerItem(data, index);
          });
      }
    }
    return "";
  };

  const playerItem = (data, index) => {
    if (data.isGMPlayer) {
      if (role !== "GM") {
        return "";
      }

      return (
        <div key={index}>
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
            <div
              className="outline"
              style={{
                width: 150,
                textAlign: "center",
                fontSize: 12,
                marginRight: 4,
                color: "orange",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                display: "inline-block",
                paddingLeft: 4,
                minHeight: 18,
              }}
            >
              {data.traits ? data.traits.name : ""}
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                width: 150,
                gap: 4,
                justifyContent: "center",
              }}
            >
              <span
                className="outline"
                style={{ marginRight: 4, textAlign: "center" }}
              >
                DMG:
                <div className="outline" style={{ color: "red" }}>
                  {data.stats ? data.stats.currentHP : 0}
                </div>
              </span>
              <span
                className="outline"
                style={{ marginRight: 4, textAlign: "center" }}
              >
                SPENT:
                <div className="outline" style={{ color: "lightblue" }}>
                  {data.stats ? data.stats.currentMP : 0}
                </div>
              </span>
              <span
                className="outline"
                style={{ marginRight: 4, textAlign: "center" }}
              >
                DEF:
                <div className="outline" style={{ color: "violet" }}>
                  {(data.stats ? parseInt(data.stats.defense) : 0) +
                    getDiceStat(data.attributes.currentdex)}
                </div>
              </span>
              <span
                className="outline"
                style={{ marginRight: 4, textAlign: "center" }}
              >
                M.DEF:
                <div className="outline" style={{ color: "cyan" }}>
                  {(data.stats ? parseInt(data.stats.mDefense) : 0) +
                    getDiceStat(data.attributes.currentins)}
                </div>
              </span>
            </div>
            <button
              className="button"
              style={{
                marginLeft: "auto",
                width: 70,
                padding: 5,
                marginRight: 4,
              }}
              onClick={async () => {
                setTab("actions");
                setDiceOne("");
                setDiceTwo("");
                setHealthModifier(0);
                setMindModifier(0);
                setBonus(0);
                setEditMode(false);
                setPlayer(data);
                sendCharacter(data);
              }}
            >
              Open
            </button>
            <button
              className="button"
              style={{
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
      <div key={index}>
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
            className="outline"
            style={{
              width: 150,
              textAlign: "center",
              borderBottom: "1px solid #222",
              fontSize: 12,
              marginRight: 4,
              color: "orange",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "inline-block",
              paddingLeft: 4,
              minHeight: 18,
            }}
          >
            {data.traits.name}
          </div>

          <Text>FP: </Text>
          <input
            className="input-stat"
            type="number"
            style={{
              width: 20,
              color: "white",
            }}
            value={data.stats.fabula}
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
            value={data.stats.currentHP}
          />
          <Text>MP: </Text>
          <input
            className="input-stat"
            style={{
              width: 20,
              color: "LightBlue",
            }}
            readOnly={true}
            value={data.stats.currentMP}
          />
          <Text>IP: </Text>
          <input
            className="input-stat"
            style={{
              width: 20,
              color: "Orange",
            }}
            readOnly={true}
            value={data.stats.currentIP}
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

        {editMode && (
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
        )}
        <button
          className="button"
          style={{
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
        {editMode && (
          <button
            className="button"
            style={{
              width: 40,
              padding: 5,
              marginRight: 4,
              float: "right",
            }}
            onClick={async () => {
              setTab("link");
              setPlayer(data);
            }}
          >
            Link
          </button>
        )}
        <button
          className="button"
          style={{
            marginLeft: 4,
            width: 70,
            padding: 5,
            marginRight: 4,
            float: "right",
          }}
          onClick={async () => {
            setTab("stats");
            setDiceOne("");
            setDiceTwo("");
            setHealthModifier(0);
            setMindModifier(0);
            setBonus(0);
            setEditMode(false);
            setPlayer(data);
            sendCharacter(data);
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

          <button
            className="button"
            style={{
              fontWeight: "bolder",
              width: 60,
              float: "right",
            }}
            onClick={() => {
              if (editMode) {
                showMessage(`Edit mode disabled.`);
              } else showMessage(`Edit mode enabled.`);
              setEditMode(!editMode);
            }}
          >
            {editMode ? "Done Edit" : "Edit"}
          </button>

          {!editMode && (
            <button
              className="button"
              style={{
                fontWeight: "bolder",
                width: 80,
                float: "right",
                marginRight: 4,
              }}
              onClick={() => {
                addPlayer();
              }}
            >
              Add Character
            </button>
          )}

          {editMode && (
            <button
              className="button"
              style={{
                fontWeight: "bolder",
                width: 110,
                float: "right",
                marginRight: 4,
              }}
              onClick={async () => {
                const allItems = await OBR.scene.items.getItems((item) => true);

                if (allItems.length > 0) {
                  showMessage("Need empty scene in order to add game layout!");
                } else {
                  layout.forEach((item, index) => {
                    setTimeout(async () => {
                      await OBR.scene.items.addItems([item]);
                    }, 250 * index);
                  });
                }
              }}
            >
              Create Game Layout
            </button>
          )}
        </div>
        <hr />
        {playerList
          .filter((item) => !item.isGMPlayer)
          .sort((a, b) => a.id < b.id)
          .map((data, index) => {
            return playerItem(data, index);
          })}
      </div>
    );
  };

  const renderAdversaryList = () => {
    return (
      <div style={{ marginTop: 30 }}>
        <div>
          <input
            type="file"
            ref={uploaderRef}
            multiple={false}
            accept=".json"
            style={{ display: " none" }}
            onChange={async ({ target }) => {
              const file = target.files?.[0];
              if (!file) return;
              ImportFultimatorJSON(await readFile(file));
            }}
          />
          <span style={{ fontSize: 13, color: "white" }} className="outline">
            Adversaries:
          </span>

          <button
            type="button"
            className="button"
            style={{
              fontWeight: "bolder",
              width: 60,
              float: "right",
              marginRight: 4,
            }}
            onClick={() => {
              OBR.popover.open({
                id: "fultimator/popover",
                url: "https://fabula-ultima-helper.web.app/",
                height: 700,
                width: 1200,
                anchorOrigin: { horizontal: "LEFT", vertical: "TOP" },
              });
            }}
          >
            Fultimator
          </button>
          <button
            type="button"
            className="button"
            style={{
              fontWeight: "bolder",
              width: 140,
              float: "right",
              marginRight: 4,
            }}
            onClick={() => {
              if (!uploaderRef.current) return;
              uploaderRef.current.click();
            }}
          >
            Import Fultimator NPC json
          </button>
          {role === "GM" && (
            <button
              className="button"
              style={{
                fontWeight: "bolder",
                width: 80,
                float: "right",
                marginRight: 4,
              }}
              onClick={() => {
                addGMCharacter();
              }}
            >
              Add Adversary
            </button>
          )}
          {role == "GM" && (
            <button
              type="button"
              className="button"
              style={{
                fontWeight: "bolder",
                width: 100,
                float: "right",
                marginRight: 4,
              }}
              onClick={() => {
                if (playerList.filter((item) => item.isGMPlayer).length > 0) {
                  OBR.popover.open({
                    id: "adversary",
                    url: "/adversary",
                    height: 540,
                    width: 550,
                    anchorOrigin: { horizontal: "LEFT", vertical: "BOTTOM" },
                    disableClickAway: true,
                  });
                } else {
                  showMessage("You need to have adversaries to open.");
                }
              }}
            >
              Open Adversaries
            </button>
          )}
        </div>
        <hr />
        {playerList
          .filter((item) => item.isGMPlayer)
          .sort((a, b) => a.traits.name.localeCompare(b.traits.name))
          .map((data, index) => {
            return playerItem(data, index);
          })}
      </div>
    );
  };

  const renderNav = () => {
    return (
      <div>
        {tab !== "link" ? (
          <span>
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
              style={{
                marginLeft: 4,
                width: "auto",
                padding: 5,
                marginRight: 6,
              }}
              onClick={() => {
                setTab("actions");
              }}
            >
              Actions/Rolls
            </button>
          </span>
        ) : (
          <span
            className="outline"
            style={{
              display: "inline-block",
              marginRight: 80,
              fontSize: 13,
            }}
          >
            Link stats to owlbear items
          </span>
        )}
        <Text>HP:</Text>
        <input
          className="input-stat"
          type="number"
          style={{
            width: 20,
            color: "Red",
          }}
          onChange={(evt) => {
            const playerGet = { ...player };
            const maxHP = player.stats.maxHP;
            let value = parseInt(evt.target.value, 0);

            if (!isNaN(value)) {
              playerGet.stats.currentHP = maxHP > value ? value : maxHP;
            } else {
              playerGet.stats.currentHP = value;
            }

            if (playerGet.linkedStats) {
              updateNoteItem(
                playerGet.linkedStats.currentHP,
                playerGet.stats.currentHP,
                "currentHP",
                maxHP
              );
            }

            updatePlayer(playerGet);
          }}
          value={player.stats.currentHP}
          onBlur={() => {
            const playerGet = { ...player };
            if (isNaN(playerGet.stats.currentHP)) {
              playerGet.stats.currentHP = 0;
              updatePlayer(playerGet);
            }
          }}
        />
        <Text>MP:</Text>
        <input
          className="input-stat"
          type="number"
          style={{
            width: 20,
            color: "LightBlue",
          }}
          onChange={(evt) => {
            const playerGet = { ...player };
            const maxMP =
              getDiceStat(player.attributes.wil) * 5 +
              player.stats.mpMod +
              player.traits.level;

            let value = parseInt(evt.target.value, 0);

            if (!isNaN(value)) {
              playerGet.stats.currentMP = maxMP > value ? value : maxMP;
            } else {
              playerGet.stats.currentMP = value;
            }
            if (playerGet.linkedStats) {
              updateNoteItem(
                playerGet.linkedStats.currentMP,
                playerGet.stats.currentMP,
                "currentMP",
                maxMP
              );
            }

            updatePlayer(playerGet);
          }}
          value={player.stats.currentMP}
          onBlur={() => {
            const playerGet = { ...player };
            if (isNaN(playerGet.stats.currentMP)) {
              playerGet.stats.currentMP = 0;
              updatePlayer(playerGet);
            }
          }}
        />
        <Text>IP:</Text>
        <input
          className="input-stat"
          type="number"
          style={{
            width: 20,
            color: "Orange",
          }}
          onChange={(evt) => {
            const playerGet = { ...player };
            const maxIP = player.stats.maxIP;

            let value = parseInt(evt.target.value, 0);
            if (!isNaN(value)) {
              playerGet.stats.currentIP = maxIP > value ? value : maxIP;
            } else {
              playerGet.stats.currentIP = value;
            }
            if (playerGet.linkedStats) {
              updateNoteItem(
                playerGet.linkedStats.currentIP,
                playerGet.stats.currentIP,
                "currentIP"
              );
            }

            updatePlayer(playerGet);
          }}
          value={player.stats.currentIP}
          onBlur={() => {
            const playerGet = { ...player };
            if (isNaN(playerGet.stats.currentIP)) {
              playerGet.stats.currentIP = 0;
              updatePlayer(playerGet);
            }
          }}
        />
        <Text>FP:</Text>
        <input
          className="input-stat"
          type="number"
          style={{
            width: 20,
            color: "White",
          }}
          onChange={(evt) => {
            const playerGet = { ...player };
            playerGet.stats.fabula = parseInt(evt.target.value);
            if (playerGet.linkedStats) {
              updateNoteItem(
                playerGet.linkedStats.fabula,
                playerGet.stats.fabula,
                "fabula"
              );
            }
            updatePlayer(playerGet);
          }}
          value={player.stats.fabula}
          onBlur={() => {
            const playerGet = { ...player };
            if (isNaN(playerGet.stats.fabula)) {
              playerGet.stats.fabula = 0;
              updatePlayer(playerGet);
            }
          }}
        />
        <button
          className="button"
          style={{
            float: "right",
            width: "auto",
            padding: 5,
            color: "red",
            marginTop: 2,
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
      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
        <div
          style={{
            textAlign: "center",
            position: "relative",
            backgroundImage: `url(${player.traits.avatar})`,
            minWidth: 100,
            height: 100,
            backgroundSize: "cover",
          }}
        >
          {!player.traits.avatar && (
            <div className="outline" style={{ width: 100, color: "orange" }}>
              Select a token and press change to add an avatar to your sheet
            </div>
          )}
          <button
            className="button"
            style={{
              width: 50,
              padding: 0,
              height: 15,
              fontSize: 8,
              position: "absolute",
              left: 24,
              bottom: -3,
            }}
            onClick={async () => {
              const selected = await OBR.player.getSelection();
              if (selected && selected[0]) {
                const items = await OBR.scene.items.getItems([selected[0]]);
                const playerGet = { ...player };
                if (items[0].image && items[0].image.url) {
                  playerGet.traits.avatar = items[0].image.url;
                  updatePlayer(playerGet);
                }
              }
            }}
          >
            Change
          </button>
        </div>
        <div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <div style={{ width: 40 }}>
              <Text>Name: </Text>
            </div>
            <input
              className="input-stat"
              style={{
                width: 338,
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
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              paddingTop: 4,
              justifyContent: "space-between",
            }}
          >
            <div style={{ width: 37 }}>
              <Text>Theme: </Text>
            </div>
            <input
              className="input-stat"
              style={{
                width: 140,
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
            <br />
            <div style={{ width: 35 }}>
              <Text>Origin: </Text>
            </div>
            <input
              className="input-stat"
              style={{
                width: 140,
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
                width: 338,
                color: "white",
                height: 25,
              }}
              value={player.traits.identity}
              onChange={(evt) => {
                const playerGet = { ...player };
                playerGet.traits.identity = evt.target.value;
                updatePlayer(playerGet);
              }}
              placeholder="This is a short sentence that sums up your character's general concept"
            ></input>
          </div>
        </div>
      </div>
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
            fontSize: 10,
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
        <span className="outline">
          {label}:{" "}
          <span style={{ color: "orange" }}>
            {player.attributes["current" + stat]}
          </span>
        </span>
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
          marginRight: 4,
          fontSize: 10,
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
          sendSkill({
            name:
              playerGet.traits.name +
              (playerGet.debuff[condition] ? " suffers " : " recovers from ") +
              condition +
              "!",
            info: "",
            detail:
              "Bringing their `" +
              stat.toUpperCase() +
              "` one die size " +
              (playerGet.debuff[condition] ? "lower." : "higher."),
          });

          addGMStatusEffectIcon(playerGet);
        }}
      >
        {condition}
      </button>
    );
  };

  const addStatusEffectIcon = async (playerGet) => {
    const items = await OBR.scene.items.getItems([
      playerGet.linkedStats.currentHP,
    ]);

    if (!items.length) return;

    const debuffToPush = [];
    const debuffToDelete = [];
    let debuffCount = 0;

    debuffList.forEach(async (debuff, index) => {
      if (playerGet.debuff[debuff.name]) {
        debuffToPush.push({
          type: "IMAGE",
          id: playerGet.linkedStats.currentHP + "_" + debuff.name,
          name: debuff.name,
          position: {
            x: items[0].position.x + debuffCount * 80 - 50,
            y: items[0].position.y - 120,
          },
          attachedTo: playerGet.linkedStats.currentHP,
          rotation: 0,
          scale: { x: 0.7, y: 0.7 },
          visible: true,
          locked: true,
          createdUserId: "691aa845-022d-4c0f-948f-4bfc5a4037f3",
          zIndex: 2708870140636,
          lastModified: "2024-02-25T14:09:00.636Z",
          lastModifiedUserId: "691aa845-022d-4c0f-948f-4bfc5a4037f3",
          metadata: {},
          image: {
            url: debuff.url,
            mime: "image/png",
            width: 126,
            height: 117,
          },
          grid: { dpi: 150, offset: { x: 2, y: -42 } },
          text: {
            type: "RICH",
            style: {
              padding: 16,
              fontSize: 24,
              fillColor: "#ffd433",
              textAlign: "CENTER",
              fontFamily: "Roboto",
              fontWeight: 400,
              lineHeight: 1.5,
              fillOpacity: 1,
              strokeColor: "#222222",
              strokeWidth: 5,
              strokeOpacity: 1,
              textAlignVertical: "TOP",
            },
            width: "AUTO",
            height: "AUTO",
            richText: [{ type: "paragraph", children: [{ text: "" }] }],
            plainText: "",
          },
          textItemType: "TEXT",
          layer: "TEXT",
        });
        debuffCount++;
      } else {
        debuffToDelete.push(
          playerGet.linkedStats.currentHP + "_" + debuff.name
        );
      }
    });

    await OBR.scene.items.addItems(debuffToPush);
    await OBR.scene.items.deleteItems(debuffToDelete);
  };

  const Attribute = (props) => {
    const { stat, condition, label } = props;
    return (
      <div style={{ width: 95 }}>
        <div>
          <Text>{label}:</Text>
        </div>
        <select
          className="attribute-stat"
          style={{ marginRight: 4 }}
          value={player.attributes[stat]}
          onChange={(evt) => {
            const playerGet = { ...player };
            player.attributes[stat] = evt.target.value;
            playerGet.attributes["current" + stat] = getCurrentAttribute(stat);

            if (stat === "mig") {
              playerGet.stats.maxHP =
                getDiceStat(evt.target.value) * 5 +
                player.stats.hpMod +
                player.traits.level;
            }

            if (stat === "wil") {
              playerGet.stats.maxMP =
                getDiceStat(evt.target.value) * 5 +
                player.stats.mpMod +
                player.traits.level;
            }

            if (!playerGet.stats.martialDef) {
              playerGet.stats.defense =
                parseInt(playerGet.stats.defenseMod) +
                getDiceStat(playerGet.attributes.currentdex);
              if (playerGet.linkedStats) {
                updateNoteItem(
                  playerGet.linkedStats.defense,
                  playerGet.stats.defense,
                  "defense"
                );
              }
            }
            playerGet.stats.mDefense =
              parseInt(playerGet.stats.mDefenseMod) +
              getDiceStat(playerGet.attributes.currentins);
            if (playerGet.linkedStats) {
              updateNoteItem(
                playerGet.linkedStats.mDefense,
                playerGet.stats.mDefense,
                "mDefense"
              );
            }
            updatePlayer(playerGet);

            sendSkill({
              name: player.traits.name + " changed their " + stat.toUpperCase(),
              info: "",
              detail:
                "Bringing their `" +
                stat.toUpperCase() +
                "` to `" +
                playerGet.attributes["current" + stat] +
                "`",
            });
          }}
        >
          <option value="d12">d12</option>
          <option value="d10">d10</option>
          <option value="d8">d8</option>
          <option value="d6">d6</option>
        </select>
        <button
          className="button"
          style={{
            marginLeft: 4,
            fontSize: 10,
            width: 40,
            textTransform: "capitalize",
            backgroundColor: player.debuff[condition] ? "darkred" : "#222",
            color: player.debuff[condition] ? "white" : "#ffd433",
          }}
          onClick={() => {
            const playerGet = { ...player };
            playerGet.debuff[condition] = !player.debuff[condition];
            playerGet.attributes["current" + stat] = getCurrentAttribute(stat);
            if (!playerGet.stats.martialDef) {
              playerGet.stats.defense =
                parseInt(playerGet.stats.defenseMod) +
                getDiceStat(playerGet.attributes.currentdex);
              if (playerGet.linkedStats) {
                updateNoteItem(
                  playerGet.linkedStats.defense,
                  playerGet.stats.defense,
                  "defense"
                );
              }
            }
            playerGet.stats.mDefense =
              parseInt(playerGet.stats.mDefenseMod) +
              getDiceStat(playerGet.attributes.currentins);
            if (playerGet.linkedStats) {
              updateNoteItem(
                playerGet.linkedStats.mDefense,
                playerGet.stats.mDefense,
                "mDefense"
              );
            }

            sendSkill({
              name:
                player.traits.name +
                (playerGet.debuff[condition] ? " suffers" : " recovers from") +
                ` ${condition}!`,
              info: "",
              detail:
                "Bringing their `" +
                stat.toUpperCase() +
                "` to `" +
                playerGet.attributes["current" + stat] +
                "`",
            });
            updatePlayer(playerGet);

            addStatusEffectIcon(playerGet);
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
          width: 92,
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
            fontSize: 10,
            width: 50,
            textTransform: "capitalize",
            backgroundColor: player.debuff.enraged ? "darkred" : "#222",
            color: player.debuff.enraged ? "white" : "#ffd433",
          }}
          onClick={() => {
            const playerGet = { ...player };
            playerGet.debuff.enraged = !player.debuff.enraged;
            playerGet.attributes["currentdex"] = getCurrentAttribute("dex");
            playerGet.attributes["currentins"] = getCurrentAttribute("ins");
            if (!playerGet.stats.martialDef) {
              playerGet.stats.defense =
                parseInt(playerGet.stats.defenseMod) +
                getDiceStat(playerGet.attributes.currentdex);
              if (playerGet.linkedStats) {
                updateNoteItem(
                  playerGet.linkedStats.defense,
                  playerGet.stats.defense,
                  "defense"
                );
              }
            }

            playerGet.stats.mDefense =
              parseInt(playerGet.stats.mDefenseMod) +
              getDiceStat(playerGet.attributes.currentins);
            if (playerGet.linkedStats) {
              updateNoteItem(
                playerGet.linkedStats.mDefense,
                playerGet.stats.mDefense,
                "mDefense"
              );
            }

            updatePlayer(playerGet);
            sendSkill({
              name:
                player.traits.name +
                (playerGet.debuff.enraged ? " suffers" : " recovers from") +
                " enraged!",
              info: "",
              detail:
                "Bringing their `DEX` to `" +
                playerGet.attributes["currentdex"] +
                "` and `INS` to `" +
                playerGet.attributes["currentins"] +
                "`",
            });
            addStatusEffectIcon(playerGet);
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
            fontSize: 10,
            width: 50,
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
            sendSkill({
              name:
                player.traits.name +
                (playerGet.debuff.poisoned ? " suffers" : " recovers from") +
                " poisoned!",
              info: "",
              detail:
                "Bringing their `MIG` to `" +
                playerGet.attributes["currentmig"] +
                "` and `WIL` to `" +
                playerGet.attributes["currentwil"] +
                "`",
            });
            addStatusEffectIcon(playerGet);
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
              width: 282,
              color: "white",
              marginLeft: 0,
              marginRight: 4,
              fontSize: 10,
            }}
            value={player.items.accessory}
            onChange={(evt) => {
              const playerGet = { ...player };
              playerGet.items.accessory = evt.target.value;
              updatePlayer(playerGet);
            }}
          />
          <button
            className="button"
            style={{ marginRight: 4, width: 40 }}
            onClick={() =>
              sendSkill({ name: "Accessory", detail: player.items.accessory })
            }
          >
            Show
          </button>
        </div>
        <div>
          <div>
            <Text>Armor: </Text>
          </div>
          <input
            className="input-stat"
            style={{
              width: 282,
              color: "white",
              marginLeft: 0,
              marginRight: 4,
              fontSize: 10,
            }}
            value={player.items.armor}
            onChange={(evt) => {
              const playerGet = { ...player };
              playerGet.items.armor = evt.target.value;
              updatePlayer(playerGet);
            }}
          />
          <button
            className="button"
            style={{ marginRight: 4, width: 40 }}
            onClick={() =>
              sendSkill({ name: "Armor", detail: player.items.armor })
            }
          >
            Show
          </button>
        </div>
        <div>
          <div>
            <Text>Main Hand: </Text>
          </div>
          <input
            className="input-stat"
            style={{
              width: 282,
              color: "white",
              marginLeft: 0,
              marginRight: 4,
              fontSize: 10,
            }}
            value={player.items.mainhand}
            onChange={(evt) => {
              const playerGet = { ...player };
              playerGet.items.mainhand = evt.target.value;
              updatePlayer(playerGet);
            }}
          />
          <button
            className="button"
            style={{ marginRight: 4, width: 40 }}
            onClick={() =>
              sendSkill({ name: "Main Hand", detail: player.items.mainhand })
            }
          >
            Show
          </button>
        </div>
        <div>
          <div>
            <Text>Off Hand: </Text>
          </div>
          <input
            className="input-stat"
            style={{
              width: 282,
              color: "white",
              marginLeft: 0,
              marginRight: 4,
              fontSize: 10,
            }}
            value={player.items.offhand}
            onChange={(evt) => {
              const playerGet = { ...player };
              playerGet.items.offhand = evt.target.value;
              updatePlayer(playerGet);
            }}
          />
          <button
            className="button"
            style={{ marginRight: 4, width: 40 }}
            onClick={() =>
              sendSkill({ name: "Off Hand", detail: player.items.offhand })
            }
          >
            Show
          </button>
        </div>
      </div>
    );
  };

  const renderStats = () => {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#333",
          borderRadius: 4,
          height: 24,
        }}
      >
        <div className="outline" style={{ marginRight: 4 }}>
          <Text>Max HP:</Text>
        </div>
        <div className="outline" style={{ color: "red", marginRight: 4 }}>
          {player.stats.maxHP}
        </div>
        <div className="outline" style={{ marginRight: 4 }}>
          Max MP:
        </div>
        <div className="outline" style={{ marginRight: 4, color: "lightblue" }}>
          {player.stats.maxMP}
        </div>
        <div className="outline" style={{ marginRight: 4 }}>
          Max IP:
        </div>
        <div className="outline" style={{ color: "orange", marginRight: 4 }}>
          {player.stats.maxIP}
        </div>
        <div className="outline" style={{ marginRight: 4 }}>
          DEF:
        </div>
        <div className="outline" style={{ color: "violet", marginRight: 4 }}>
          {player.stats.defense}
        </div>
        <div className="outline" style={{ marginRight: 4 }}>
          M.DEF:
        </div>
        <div className="outline" style={{ color: "cyan", marginRight: 4 }}>
          {player.stats.mDefense}
        </div>
        <div className="outline" style={{ marginRight: 4 }}>
          DEX:
        </div>
        <div className="outline" style={{ color: "lightgrey", marginRight: 4 }}>
          {player.attributes.currentdex}
        </div>
        <div className="outline" style={{ marginRight: 4 }}>
          INS:
        </div>
        <div className="outline" style={{ color: "lightgrey", marginRight: 4 }}>
          {player.attributes.currentins}
        </div>
        <div className="outline" style={{ marginRight: 4 }}>
          MIG:
        </div>
        <div className="outline" style={{ color: "lightgrey", marginRight: 4 }}>
          {player.attributes.currentmig}
        </div>
        <div className="outline" style={{ marginRight: 4 }}>
          WIL:
        </div>
        <div className="outline" style={{ color: "lightgrey", marginRight: 4 }}>
          {player.attributes.currentwil}
        </div>
      </div>
    );
  };

  const renderItemStats = () => {
    return (
      <div>
        <Text>Level:</Text>
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

            playerGet.stats.maxHP =
              getDiceStat(player.attributes.mig) * 5 +
              player.stats.hpMod +
              parseInt(evt.target.value);

            playerGet.stats.maxMP =
              getDiceStat(player.attributes.wil) * 5 +
              player.stats.mpMod +
              parseInt(evt.target.value);

            playerGet.traits.level = parseInt(evt.target.value);

            updateNoteItem(
              playerGet.linkedStats.currentHP,
              playerGet.stats.currentHP,
              "currentHP",
              playerGet.stats.maxHP
            );

            updateNoteItem(
              playerGet.linkedStats.currentMP,
              playerGet.stats.currentMP,
              "currentMP",
              playerGet.stats.maxMP
            );

            updatePlayer(playerGet);
          }}
        />
        <Text>Experience:</Text>
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
          onBlur={() => {
            const playerGet = { ...player };
            if (isNaN(playerGet.stats.experience)) {
              playerGet.stats.experience = 0;
              updatePlayer(playerGet);
            }
          }}
        />
        <button
          className="button"
          style={{
            width: 80,
            marginLeft: 4,
            marginRight: 4,
            padding: 4,
          }}
          onClick={() => {
            const playerGet = { ...player };
            playerGet.stats.martialDef = !playerGet.stats.martialDef;
            if (!playerGet.stats.martialDef) {
              playerGet.stats.defense =
                parseInt(playerGet.stats.defenseMod) +
                getDiceStat(player.attributes.dex);
            } else {
              playerGet.stats.defense = playerGet.stats.defenseMartial;
            }
            if (playerGet.linkedStats) {
              updateNoteItem(
                playerGet.linkedStats.defense,
                playerGet.stats.defense,
                "defense"
              );
            }
            updatePlayer(playerGet);
          }}
        >
          {player.stats.martialDef ? "Martial" : "Non Martial"}
        </button>
        <Text>
          {player.stats.martialDef ? "Total Defense:" : "Defense Mod:"}
        </Text>
        <input
          className="input-stat"
          type="number"
          style={{
            width: 20,
            color: "violet",
          }}
          value={
            player.stats.martialDef
              ? player.stats.defenseMartial
              : player.stats.defenseMod
          }
          onChange={(evt) => {
            const playerGet = { ...player };
            if (player.stats.martialDef) {
              playerGet.stats.defenseMartial = parseInt(evt.target.value);
              playerGet.stats.defense = parseInt(evt.target.value);
            } else {
              playerGet.stats.defenseMod = parseInt(evt.target.value, 0);
              playerGet.stats.defense =
                parseInt(evt.target.value) +
                getDiceStat(player.attributes.currentdex);
            }
            if (playerGet.linkedStats) {
              updateNoteItem(
                playerGet.linkedStats.defense,
                playerGet.stats.defense,
                "defense"
              );
            }
            updatePlayer(playerGet);
          }}
          onBlur={() => {
            const playerGet = { ...player };
            if (isNaN(playerGet.stats.defenseMartial)) {
              playerGet.stats.defenseMartial = 0;
              updatePlayer(playerGet);
            }
            if (isNaN(playerGet.stats.defense)) {
              playerGet.stats.defense = 0;
              updatePlayer(playerGet);
            }
            if (isNaN(playerGet.stats.defenseMod)) {
              playerGet.stats.defenseMod = 0;
              updatePlayer(playerGet);
            }
          }}
        />
        <Text>Magic Defense Mod: </Text>
        <input
          className="input-stat"
          type="number"
          style={{
            width: 20,
            color: "cyan",
          }}
          value={player.stats.mDefenseMod}
          onChange={(evt) => {
            const playerGet = { ...player };
            playerGet.stats.mDefenseMod = parseInt(evt.target.value);
            playerGet.stats.mDefense =
              parseInt(evt.target.value) +
              getDiceStat(player.attributes.currentins);
            if (playerGet.linkedStats) {
              updateNoteItem(
                playerGet.linkedStats.mDefense,
                playerGet.stats.mDefense,
                "mDefense"
              );
            }
            updatePlayer(playerGet);
          }}
          onBlur={() => {
            const playerGet = { ...player };
            if (isNaN(playerGet.stats.mDefenseMod)) {
              playerGet.stats.mDefenseMod = 0;
              updatePlayer(playerGet);
            }
            if (isNaN(playerGet.stats.mDefense)) {
              playerGet.stats.mDefense = 0;
              updatePlayer(playerGet);
            }
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

            playerGet.stats.maxHP =
              getDiceStat(player.attributes.mig) * 5 +
              parseInt(evt.target.value) +
              player.traits.level;
            playerGet.stats.hpMod = parseInt(evt.target.value);
            updatePlayer(playerGet);
          }}
          onBlur={() => {
            const playerGet = { ...player };
            if (isNaN(playerGet.stats.hpMod)) {
              playerGet.stats.hpMod = 0;
              playerGet.stats.maxHP =
                getDiceStat(player.attributes.mig) * 5 + player.traits.level;
              updatePlayer(playerGet);
            }
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
            playerGet.stats.maxMP =
              getDiceStat(player.attributes.wil) * 5 +
              parseInt(evt.target.value) +
              player.traits.level;
            playerGet.stats.mpMod = parseInt(evt.target.value);
            updatePlayer(playerGet);
          }}
          onBlur={() => {
            const playerGet = { ...player };
            if (isNaN(playerGet.stats.mpMod)) {
              playerGet.stats.mpMod = 0;
              playerGet.stats.maxMP =
                getDiceStat(player.attributes.wil) * 5 + player.traits.level;
              updatePlayer(playerGet);
            }
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
            playerGet.stats.maxIP = 6 + parseInt(evt.target.value);
            playerGet.stats.ipMod = parseInt(evt.target.value);
            updatePlayer(playerGet);
          }}
          onBlur={() => {
            const playerGet = { ...player };
            if (isNaN(playerGet.stats.ipMod)) {
              playerGet.stats.ipMod = 0;
              updatePlayer(playerGet);
            }
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
    playerGet.skills[index].items.push({
      name: "",
      info: "",
      detail: "",
    }),
      updatePlayer(playerGet);
    showMessage(`Added new item.`);
  };

  const removeSkill = (index, itemIndex) => {
    if (confirm("Are you sure you want to delete the skill?") == true) {
      const playerGet = { ...player };
      playerGet.skills[index].items.splice(itemIndex, 1);
      updatePlayer(playerGet);
      showMessage(`Removed item.`);
    }
  };

  const parseQuote = (str) => {
    const split = str.split("`");

    return split.map((item, index) => {
      if (index % 2 !== 0) {
        return (
          <span key={"parseTilde" + index} style={{ color: "moccasin" }}>
            {item}
          </span>
        );
      }
      return <span key={"parseTilde" + index}>{item}</span>;
    });
  };

  const parseAsterisk = (str) => {
    const split = str.split("*");

    return split.map((item, index) => {
      if (index % 2 !== 0) {
        return (
          <span key={"parseAsterisk" + index} style={{ color: "red" }}>
            {item}
          </span>
        );
      }
      return <span key={"parseAsterisk" + index}>{parseQuote(item)}</span>;
    });
  };

  const parseDetail = (str) => {
    if (str === undefined) return "";
    const detailSplit = str.split("\n");
    return detailSplit.map((item, index) => {
      if (item === "") return <div key={"parseDetail" + index}>&#8205;</div>;

      return <div key={"parseDetail" + index}>{parseAsterisk(item)}</div>;
    });
  };

  const getImage = (str) => {
    return str.substring(str.indexOf("<") + 1, str.lastIndexOf(">"));
  };

  const getSFX = (str) => {
    return str.substring(str.indexOf("$") + 1, str.lastIndexOf("$"));
  };

  const getAnimation = (str) => {
    return str.substring(str.indexOf("@") + 1, str.lastIndexOf("@"));
  };

  const skillInstance = (data, index, itemIndex) => {
    let propsString = JSON.stringify(data);
    const imageURL = getImage(propsString);
    const sfxURL = getSFX(propsString);
    const animation = getAnimation(propsString);

    if (imageURL) {
      propsString = propsString.replace("<" + imageURL + ">", "");
    }

    if (sfxURL) {
      propsString = propsString.replace("$" + sfxURL + "$", " ♫ ");
    }

    if (animation) {
      propsString = propsString.replace(
        "@" + animation + "@",
        "⚡: " + animation
      );
    }

    const item = JSON.parse(propsString);
    return (
      <div
        key={"skillInstance" + itemIndex}
        style={{ marginTop: 10, marginBottom: 10 }}
      >
        <div className="skill-detail">
          <div
            style={{
              fontSize: 13,
              color: "darkorange",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div>
              <div>{item.name}</div>
              {item.info ? (
                <div
                  style={{ color: "darkgrey", cursor: "copy", fontSize: 10 }}
                >
                  {item.info}
                </div>
              ) : (
                ""
              )}
            </div>
            <div>
              <button
                className="button"
                style={{
                  float: "right",
                  font: 10,
                  padding: 4,
                  marginLeft: 8,
                }}
                onClick={() => {
                  sendSkill(data);
                }}
              >
                Send
              </button>
            </div>
          </div>

          <hr
            style={{
              marginTop: 6,
              marginBottom: 6,
              borderColor: "grey",
              backgroundColor: "grey",
              color: "grey",
            }}
          ></hr>
          <div style={{ display: "flex", gap: 10 }}>
            <div style={{ flex: 3 }}>
              {parseDetail(item.detail ? item.detail.trim() : "")}
            </div>
            {imageURL && (
              <div
                style={{
                  flex: 1,
                  backgroundImage: `url(${imageURL})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  height: 80,
                  overflow: "hidden",
                  marginLeft: "auto",
                  marginRight: "auto",
                  borderRadius: 5,
                }}
              ></div>
            )}
          </div>
        </div>
      </div>
    );
  };

  const skill = (data, index, itemIndex) => {
    return (
      <div key={itemIndex}>
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
            onClick={() => {
              sendSkill(data);
            }}
          >
            Send
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

  const categoryInstance = (data, index) => {
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
      <div
        className="skill-detail"
        style={{ marginTop: 20, backgroundColor: "#333" }}
        key={index}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            cursor: "pointer",
          }}
          onClick={() => {
            const playerGet = { ...player };
            playerGet.skills[index].collapse =
              !playerGet.skills[index].collapse;
            updatePlayer(playerGet);
          }}
        >
          <span
            className="outline"
            style={{
              fontSize: 16,
              color: "red",
              marginRight: 5,
            }}
          >
            {data.categoryName}
          </span>
          <span className="outline" style={{ fontSize: 11 }}>
            {data.categoryInfo}
          </span>

          <button
            className="button"
            style={{ marginLeft: "auto", marginRight: 8 }}
            onClick={() => {
              const playerGet = { ...player };
              playerGet.skills[index].edit = true;
              updatePlayer(playerGet);
            }}
          >
            Edit
          </button>

          {data.collapse ? (
            <span className="outline" style={{ fontSize: 12 }}>
              ▼
            </span>
          ) : (
            <span className="outline" style={{ fontSize: 12 }}>
              ▲
            </span>
          )}
        </div>
        {!data.collapse && (
          <>
            <hr
              style={{
                marginBottom: 8,
                borderColor: "#666",
                backgroundColor: "#666",
                color: "#666",
              }}
            ></hr>
            {items.map((item, itemIndex) => {
              return skillInstance(item, index, itemIndex);
            })}
          </>
        )}
      </div>
    );
  };

  const addCategory = () => {
    const playerGet = { ...player };
    playerGet.skills.push({
      categoryName: "",
      categoryInfo: "",
      edit: true,
      items: [{ name: "", info: "", detail: "" }],
    });
    updatePlayer(playerGet);
    showMessage(`Added new category.`);
  };

  const removeCategory = (index) => {
    if (confirm("Are you sure you want to delete the category?") == true) {
      const playerGet = { ...player };
      playerGet.skills.splice(index, 1);
      showMessage(`Category removed.`);
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
      <div style={{ marginTop: 20 }} key={index}>
        <hr />
        <div style={{ display: "flex", alignItems: "center" }}>
          <Text>Category: </Text>
          <input
            className="input-stat"
            style={{
              width: 100,
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
              width: 130,
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
          <button
            className="button"
            style={{ width: 25, marginRight: 4 }}
            onClick={() => {
              sortCategoryUp(index);
            }}
          >
            ↑
          </button>
          <button
            className="button"
            style={{ width: 25, marginRight: 4 }}
            onClick={() => {
              sortCategoryDown(index);
            }}
          >
            ↓
          </button>
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
          <div style={{ display: "flex", justifyContent: "center" }}>
            <button
              className="button"
              style={{ fontWeight: "bolder", width: 50, marginRight: 4 }}
              onClick={() => {
                const playerGet = { ...player };
                playerGet.skills[index].edit = false;
                updatePlayer(playerGet);
              }}
            >
              Done
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

  const [collapseAll, setCollapseAll] = useState(true);

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
            style={{
              fontWeight: "bolder",
              width: 80,
              float: "right",
              marginTop: 2,
              marginLeft: 4,
            }}
            onClick={() => {
              const playerGet = { ...player };

              playerGet.skills.forEach((_, index) => {
                playerGet.skills[index].collapse = collapseAll;
              });

              updatePlayer(playerGet);
              setCollapseAll(!collapseAll);
            }}
          >
            {collapseAll ? "Collapse" : "Uncollapse"}
          </button>
          <button
            className="button"
            style={{
              fontWeight: "bolder",
              width: 80,
              float: "right",
              marginTop: 2,
            }}
            onClick={() => addCategory()}
          >
            Add Category
          </button>
        </div>

        {player.skills.map((item, index) => {
          if (!item.edit) {
            return categoryInstance(item, index);
          } else {
            return category(item, index);
          }
        })}
      </div>
    );
  };

  const actionInstance = (data, index) => {
    let propsString = JSON.stringify(data);
    const imageURL = getImage(propsString);
    const sfxURL = getSFX(propsString);
    const animation = getAnimation(propsString);

    if (imageURL) {
      propsString = propsString.replace("<" + imageURL + ">", "");
    }

    if (sfxURL) {
      propsString = propsString.replace("$" + sfxURL + "$", " ♫ ");
    }

    if (animation) {
      propsString = propsString.replace(
        "@" + animation + "@",
        "⚡: " + animation
      );
    }

    const item = JSON.parse(propsString);

    return (
      <div key={index} style={{ marginBottom: 10 }}>
        <div className="skill-detail" style={{ backgroundColor: "#111" }}>
          <div
            style={{
              fontSize: 13,
              color: "darkorange",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div>
              <div>{data.name}</div>
              {data.info ? (
                <div
                  style={{ color: "darkgrey", cursor: "copy", fontSize: 10 }}
                >
                  {data.info}
                </div>
              ) : (
                ""
              )}
            </div>
            <div>
              {data.noDice ? (
                <button
                  className="button"
                  style={{
                    float: "right",
                    font: 10,
                    padding: 4,
                    marginLeft: 8,
                    backgroundColor: "darkred",
                    color: "white",
                  }}
                  onClick={() => {
                    sendSkill(data);
                  }}
                >
                  Send
                </button>
              ) : (
                <button
                  className="button"
                  style={{
                    float: "right",
                    font: 10,
                    padding: 4,
                    marginLeft: 8,
                    backgroundColor: "darkred",
                    color: "white",
                  }}
                  onClick={() => sendRoll(data)}
                >
                  Roll
                </button>
              )}
              <button
                className="button"
                style={{
                  float: "right",
                  font: 10,
                  padding: 4,
                  marginLeft: 8,
                }}
                onClick={() => {
                  const playerGet = { ...player };
                  playerGet.actions[index].edit = true;
                  updatePlayer(playerGet);
                }}
              >
                Edit
              </button>
            </div>
          </div>

          <hr
            style={{
              marginTop: 6,
              marginBottom: 6,
              borderColor: "grey",
              backgroundColor: "grey",
              color: "grey",
            }}
          ></hr>

          {!data.noDice && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginTop: 4,
                backgroundColor: "#222",
                padding: "5px 10px",
                borderRadius: 10,
                justifyContent: "space-between",
              }}
            >
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
                onBlur={() => {
                  const playerGet = { ...player };
                  if (isNaN(parseInt(playerGet.actions[index].bonus))) {
                    playerGet.actions[index].bonus = 0;
                    updatePlayer(playerGet);
                  }
                }}
              />
              <button
                className="button"
                style={{ marginRight: 4, backgroundColor: "#333" }}
                onClick={() => {
                  const playerGet = { ...player };
                  playerGet.actions[index].useHR =
                    !playerGet.actions[index].useHR;
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
                onBlur={() => {
                  const playerGet = { ...player };
                  if (isNaN(parseInt(playerGet.actions[index].damage))) {
                    playerGet.actions[index].damage = 0;
                    updatePlayer(playerGet);
                  }
                }}
              />
            </div>
          )}
          <div style={{ display: "flex", gap: 10, marginTop: 10 }}>
            <div style={{ flex: 3 }}>
              {parseDetail(item.detail ? item.detail.trim() : "")}
            </div>
            {imageURL && (
              <div
                style={{
                  flex: 1,
                  backgroundImage: `url(${imageURL})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  height: 80,
                  overflow: "hidden",
                  marginLeft: "auto",
                  marginRight: "auto",
                  borderRadius: 5,
                }}
              ></div>
            )}
          </div>
        </div>
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
      edit: true,
    });
    updatePlayer(playerGet);
    showMessage(`Added new action.`);
  };

  const addActionNoRoll = () => {
    const playerGet = { ...player };
    playerGet.actions.push({
      name: "",
      info: "",
      detail: "",
      noDice: true,
      edit: true,
    });
    updatePlayer(playerGet);
    showMessage(`Added new action.`);
  };

  const removeAction = (index) => {
    if (confirm("Are you sure you want to delete the action?") == true) {
      const playerGet = { ...player };
      playerGet.actions.splice(index, 1);
      updatePlayer(playerGet);
      showMessage(`Deleted action.`);
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

  const sortCategoryUp = (index) => {
    if (index !== 0) {
      const playerGet = { ...player };
      const skillOne = playerGet.skills[index];
      const skillTwo = playerGet.skills[index - 1];
      playerGet.skills[index] = skillTwo;
      playerGet.skills[index - 1] = skillOne;
      updatePlayer(playerGet);
    }
  };

  const sortCategoryDown = (index) => {
    if (index < player.skills.length - 1) {
      const playerGet = { ...player };
      const skillOne = playerGet.skills[index];
      const skillTwo = playerGet.skills[index + 1];
      playerGet.skills[index] = skillTwo;
      playerGet.skills[index + 1] = skillOne;
      updatePlayer(playerGet);
    }
  };

  const [searchActions, setSearchActions] = useState("");

  const action = (data, index) => {
    return (
      <div key={index}>
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
              width: data.noDice ? 180 : 258,
              color: "lightgrey",
            }}
            value={data.info}
            placeholder="Level/Target/MP Cost/Duration/Damage/Quote/Other"
            onChange={(evt) => {
              const playerGet = { ...player };
              playerGet.actions[index].info = evt.target.value;
              updatePlayer(playerGet);
            }}
          />
          {data.noDice && (
            <>
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
                style={{ width: 25, marginRight: 4 }}
                onClick={() => {
                  sortDown(index);
                }}
              >
                ↓
              </button>
              <button
                className="button"
                style={{ marginRight: 4, width: 50 }}
                onClick={() => {
                  const playerGet = { ...player };
                  playerGet.actions[index].edit = false;
                  updatePlayer(playerGet);
                }}
              >
                Done
              </button>
            </>
          )}

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
        {!data.noDice && (
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
              onBlur={() => {
                const playerGet = { ...player };
                if (isNaN(parseInt(playerGet.actions[index].bonus))) {
                  playerGet.actions[index].bonus = 0;
                  updatePlayer(playerGet);
                }
              }}
            />
            <button
              className="button"
              style={{ marginRight: 4 }}
              onClick={() => {
                const playerGet = { ...player };
                playerGet.actions[index].useHR =
                  !playerGet.actions[index].useHR;
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
              onBlur={() => {
                const playerGet = { ...player };
                if (isNaN(parseInt(playerGet.actions[index].damage))) {
                  playerGet.actions[index].damage = 0;
                  updatePlayer(playerGet);
                }
              }}
            />
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
            <button
              className="button"
              style={{ marginLeft: 4, width: 50 }}
              onClick={() => {
                const playerGet = { ...player };
                playerGet.actions[index].edit = false;
                updatePlayer(playerGet);
              }}
            >
              Done
            </button>
          </div>
        )}
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

  const renderStatRolls = () => {
    const stats = ["dex", "ins", "mig", "wil"];

    return (
      <span>
        {stats.map((item, index) => {
          return (
            <button
              className="button"
              style={{ marginRight: 4, width: 50 }}
              onClick={() => {
                if (diceOne === "") {
                  setDiceOne(item);
                } else if (diceTwo === "") {
                  setDiceTwo(item);
                }
              }}
              key={index}
            >
              {item.toUpperCase()}
            </button>
          );
        })}
        <span style={{ display: "inline-block", marginRight: 4 }}>
          <Text>Modifier:</Text>
          <input
            className="input-stat"
            type="number"
            style={{
              width: 20,
              color: "lightblue",
            }}
            value={bonus}
            onChange={(evt) => {
              setBonus(evt.target.value);
            }}
            onBlur={() => {
              if (isNaN(parseInt(bonus))) {
                setBonus(0);
              }
            }}
          />
        </span>

        <span style={{ display: "inline-block", marginRight: 8 }}>
          <Text>
            {diceOne.toUpperCase()} {diceTwo ? "+" : ""} {diceTwo.toUpperCase()}
          </Text>
        </span>
        {(diceOne || diceTwo) && (
          <button
            className="button"
            style={{ marginRight: 4, width: 40 }}
            onClick={() => {
              setDiceOne("");
              setDiceTwo("");
            }}
          >
            Clear
          </button>
        )}

        {diceOne && (
          <button
            className="button"
            style={{ width: 80, float: "right", marginTop: 2 }}
            onClick={() => {
              sendRoll({ diceOne, diceTwo, bonus });
              setDiceOne("");
              setDiceTwo("");
            }}
          >
            Roll
          </button>
        )}
      </span>
    );
  };

  const renderDamageAndRestore = () => {
    return (
      <div style={{ marginTop: 8, marginBottom: 8 }}>
        <span style={{ display: "inline-block" }}>
          <Text>Change Hitpoints:</Text>
          <input
            className="input-stat"
            type="number"
            style={{
              width: 20,
              color: "red",
            }}
            value={healthModifier}
            onChange={(evt) => {
              setHealthModifier(evt.target.value);
            }}
            onBlur={() => {
              if (isNaN(parseInt(healthModifier))) {
                setHealthModifier(0);
              }
            }}
          />
        </span>

        <button
          className="button"
          style={{ width: 65, marginRight: 4, fontSize: 10, marginTop: 2 }}
          onClick={() => {
            const playerGet = { ...player };
            const maxHP = playerGet.stats.maxHP;

            let value =
              playerGet.stats.currentHP -
              (healthModifier === "" ? 0 : parseInt(healthModifier, 0));

            if (value < 0) value = 0;

            if (!isNaN(value)) {
              playerGet.stats.currentHP = maxHP > value ? value : maxHP;
            } else {
              playerGet.stats.currentHP = value;
            }
            if (playerGet.linkedStats) {
              updateNoteItem(
                playerGet.linkedStats.currentHP,
                playerGet.stats.currentHP,
                "currentHP",
                maxHP
              );
            }

            updatePlayer(playerGet);

            showMessage(`Inflicted ${healthModifier} damage!`);
            setHealthModifier(0);
          }}
        >
          Damage
        </button>

        <button
          className="button"
          style={{ marginRight: 14, width: 40, fontSize: 10 }}
          onClick={() => {
            const playerGet = { ...player };
            const maxHP = playerGet.stats.maxHP;

            let value =
              playerGet.stats.currentHP +
              (healthModifier === "" ? 0 : parseInt(healthModifier, 0));

            if (!isNaN(value)) {
              playerGet.stats.currentHP = maxHP > value ? value : maxHP;
            } else {
              playerGet.stats.currentHP = value;
            }
            if (playerGet.linkedStats) {
              updateNoteItem(
                playerGet.linkedStats.currentHP,
                playerGet.stats.currentHP,
                "currentHP",
                maxHP
              );
            }

            updatePlayer(playerGet);
            showMessage(`Healed ${healthModifier} hitpoints!`);
            setHealthModifier(0);
          }}
        >
          Heal
        </button>

        <span style={{ display: "inline-block" }}>
          <Text>Change Mindpoints:</Text>
          <input
            className="input-stat"
            type="number"
            style={{
              width: 20,
              color: "lightblue",
            }}
            value={mindModifier}
            onChange={(evt) => {
              setMindModifier(evt.target.value);
            }}
            onBlur={() => {
              if (isNaN(parseInt(mindModifier))) {
                setMindModifier(0);
              }
            }}
          />
        </span>

        <button
          className="button"
          style={{ width: 65, marginRight: 4, fontSize: 10, marginTop: 2 }}
          onClick={() => {
            const playerGet = { ...player };
            const maxMP = playerGet.stats.maxMP;

            let value =
              playerGet.stats.currentMP -
              (mindModifier === "" ? 0 : parseInt(mindModifier, 0));

            if (value < 0) value = 0;

            if (!isNaN(value)) {
              playerGet.stats.currentMP = maxMP > value ? value : maxMP;
            } else {
              playerGet.stats.currentMP = value;
            }
            if (playerGet.linkedStats) {
              updateNoteItem(
                playerGet.linkedStats.currentMP,
                playerGet.stats.currentMP,
                "currentMP",
                maxMP
              );
            }

            updatePlayer(playerGet);
            showMessage(`Spent ${mindModifier} mindpoints!`);
            setMindModifier(0);
          }}
        >
          Spend
        </button>

        <button
          className="button"
          style={{ marginRight: 4, width: 40, fontSize: 10 }}
          onClick={() => {
            const playerGet = { ...player };
            const maxMP = playerGet.stats.maxMP;

            let value =
              playerGet.stats.currentMP +
              (mindModifier === "" ? 0 : parseInt(mindModifier, 0));

            if (!isNaN(value)) {
              playerGet.stats.currentMP = maxMP > value ? value : maxMP;
            } else {
              playerGet.stats.currentMP = value;
            }
            if (playerGet.linkedStats) {
              updateNoteItem(
                playerGet.linkedStats.currentMP,
                playerGet.stats.currentMP,
                "currentMP",
                maxMP
              );
            }

            updatePlayer(playerGet);
            showMessage(`Restored ${mindModifier} mindpoints!`);
            setMindModifier(0);
          }}
        >
          Restore
        </button>
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
          {renderStatRolls()}
          <hr />
          <span className="outline">Search:</span>
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

          {player.isGMPlayer && (
            <button
              className="button"
              style={{ fontWeight: "bolder", width: 80 }}
              onClick={() => {
                sendRandomPlayer("");
              }}
            >
              Random Target
            </button>
          )}

          <button
            className="button"
            style={{
              fontWeight: "bolder",
              float: "right",
              width: 60,
              marginTop: 2,
              marginRight: 4,
            }}
            onClick={() => {
              addActionNoRoll();
            }}
          >
            Action
          </button>
          <button
            className="button"
            style={{
              fontWeight: "bolder",
              float: "right",
              width: 60,
              marginTop: 2,
              marginRight: 4,
            }}
            onClick={() => {
              addAction();
            }}
          >
            Roll
          </button>
          <span
            className="outline"
            style={{ float: "right", marginTop: 6, marginRight: 4 }}
          >
            Add:
          </span>
        </div>

        <hr />

        {items.map((item, index) => {
          if (!item.edit) {
            return actionInstance(item, index);
          } else return action(item, index);
        })}
      </div>
    );
  };

  const addGMStatusEffectIcon = async (playerGet) => {
    const items = await OBR.scene.items.getItems([
      playerGet.linkedStats.currentStats,
    ]);

    if (!items.length) return;

    let statusTrue = 0;

    const debuffToAdd = [];
    const debuffToRemove = [];

    debuffList.forEach((debuff) => {
      if (playerGet.debuff[debuff.name]) {
        debuffToAdd.push({
          type: "IMAGE",
          id: playerGet.linkedStats.currentStats + "_" + debuff.name,
          name: debuff.name,
          position: {
            x: items[0].position.x + statusTrue * 80,
            y: items[0].position.y - 90,
          },
          attachedTo: playerGet.linkedStats.currentStats,
          disableAttachmentBehavior: ["VISIBLE", "SCALE", "ROTATION"],
          rotation: 0,
          scale: { x: 0.7, y: 0.7 },
          visible: true,
          locked: true,
          createdUserId: "691aa845-022d-4c0f-948f-4bfc5a4037f3",
          zIndex: 1708870140636,
          lastModified: "2024-02-25T14:09:00.636Z",
          lastModifiedUserId: "691aa845-022d-4c0f-948f-4bfc5a4037f3",
          metadata: {},
          image: {
            url: debuff.url,
            mime: "image/png",
            width: 126,
            height: 117,
          },
          grid: { dpi: 150, offset: { x: 2, y: -42 } },
          text: {
            type: "RICH",
            style: {
              padding: 16,
              fontSize: 20,
              fillColor: "#ffd433",
              textAlign: "CENTER",
              fontFamily: "Roboto",
              fontWeight: 400,
              lineHeight: 1.5,
              fillOpacity: 1,
              strokeColor: "#222222",
              strokeWidth: 5,
              strokeOpacity: 1,
              textAlignVertical: "TOP",
            },
            width: "AUTO",
            height: "AUTO",
            richText: [
              { type: "paragraph", children: [{ text: debuff.label }] },
            ],
            plainText: "",
          },
          textItemType: "TEXT",
          layer: "ATTACHMENT",
        });
        statusTrue++;
      } else {
        debuffToRemove.push(
          playerGet.linkedStats.currentStats + "_" + debuff.name
        );
      }
    });
    OBR.scene.items.addItems(debuffToAdd);
    OBR.scene.items.deleteItems(debuffToRemove);
  };

  const [damageTypeSelected, setSelectedDamageType] = useState("physical");

  const damageTypes = [
    "physical",
    "wind",
    "bolt",
    "dark",
    "earth",
    "fire",
    "ice",
    "light",
    "poison",
  ];

  const affinityDictionary = {
    vu: "*Vulnerable* to ",
    na: "`Neutral` to ",
    rs: "*Resistant* to ",
    im: "*Immune* to ",
    ab: "*Absorbs* ",
  };

  const sendAffinity = (targetName, type, affinity) => {
    const skillData = {
      skillName: targetName,
      detail: affinityDictionary[affinity] + `\`${type}\``,
      characterName: player.traits.name,
      userId: id,
      username: name,
      characterID: player.id,
      id: Date.now(),
    };
    OBR.room.setMetadata({
      "ultimate.story.extension/sendskill": skillData,
    });
    showMessage("Affinity Info Sent!");
  };

  const sendRandomPlayer = (forGood) => {
    const playerListFiltered = playerList.filter((item) => !item.isGMPlayer);
    const numResult = Math.floor(Math.random() * playerListFiltered.length);

    const playerSelected = playerListFiltered[numResult];

    const skillData = {
      skillName: forGood
        ? playerSelected.traits.name + " has been selected!"
        : playerSelected.traits.name + " has been targeted!",
      info: "",
      detail: forGood
        ? '"Fate has chosen you."'
        : '"Brace yourself, this might hurt!"',
      characterName: "Random Player",
      userId: id,
      username: name,
      id: Date.now(),
    };
    OBR.room.setMetadata({
      "ultimate.story.extension/sendskill": skillData,
    });
    showMessage("Sent Random Adversary!");
  };

  const renderGMNav = () => {
    return (
      <div>
        <div
          style={{
            display: "flex",
            marginTop: 4,
            alignItems: "center",
          }}
        >
          <div style={{ width: 32 }}>
            <Text>Name: </Text>
          </div>
          <input
            className="input-stat"
            style={{
              width: 180,
              marginRight: 10,
              color: "white",
            }}
            value={player.traits.name}
            onChange={(evt) => {
              const playerGet = { ...player };
              playerGet.traits.name = evt.target.value;
              updateGMNoteItem(
                playerGet.linkedStats.currentStats,
                playerGet.stats.currentHP,
                playerGet.stats.currentMP,
                playerGet.traits.name
              );
              updatePlayer(playerGet);
            }}
            placeholder="Your Enemy Name"
          />
          <div className="outline">Switch NPC:</div>
          <select
            className="attribute-stat"
            style={{ color: "lightgrey", width: 80, marginLeft: 4 }}
            value={player.id}
            onChange={(evt) => {
              const playerGet = playerList.find((player) => {
                return player.id === parseInt(evt.target.value);
              });

              setPlayer(playerGet);
              sendCharacter(playerGet);
            }}
          >
            {playerList
              .sort((a, b) => a.traits.name.localeCompare(b.traits.name))
              .map((data, index) => {
                if (data.isGMPlayer)
                  return <option value={data.id}>{data.traits.name}</option>;
              })}
          </select>

          <button
            className="button"
            style={{
              width: 25,
              marginLeft: 4,
              marginRight: 4,
              color: "orange",
            }}
            onClick={() => {
              const adversaryList = playerList
                .filter((item) => item.isGMPlayer)
                .sort((a, b) => a.traits.name.localeCompare(b.traits.name));
              const index = adversaryList.findIndex(
                (item) => item.id === player.id
              );

              if (index !== 0 && adversaryList.length > 1) {
                setPlayer(adversaryList[index - 1]);
                sendCharacter(adversaryList[index - 1]);
              }
            }}
          >
            ←
          </button>
          <button
            className="button"
            style={{
              width: 25,
              marginRight: 4,
              color: "orange",
            }}
            onClick={() => {
              const adversaryList = playerList
                .filter((item) => item.isGMPlayer)
                .sort((a, b) => a.traits.name.localeCompare(b.traits.name));
              const index = adversaryList.findIndex(
                (item) => item.id === player.id
              );

              if (
                index !== adversaryList.length - 1 &&
                adversaryList.length > 1
              ) {
                setPlayer(adversaryList[index + 1]);
                sendCharacter(adversaryList[index + 1]);
              }
            }}
          >
            →
          </button>

          <button
            className="button"
            style={{
              marginLeft: "auto",
              width: "auto",
              padding: 5,
              color: "red",
            }}
            onClick={() => {
              if (adversaryOnly) {
                OBR.popover.close("adversary");
              } else setPlayer(null);
            }}
          >
            Close
          </button>
        </div>
        <hr />
        <div
          style={{
            display: "flex",
            gap: 5,
            alignItems: "center",
          }}
        >
          <span style={{ display: "inline-block" }}>
            <Text>DMG:</Text>
            <input
              className="input-stat"
              type="number"
              style={{
                width: 20,
                color: "Red",
              }}
              onChange={(evt) => {
                const playerGet = { ...player };

                let value = parseInt(evt.target.value, 0);
                if (playerGet.stats) {
                  playerGet.stats.currentHP = value;
                } else {
                  playerGet.stats = {
                    defense: 0,
                    mDefense: 0,
                    currentHP: value,
                    currentMP: 0,
                  };
                }

                if (playerGet.linkedStats) {
                  updateGMNoteItem(
                    playerGet.linkedStats.currentStats,
                    playerGet.stats.currentHP,
                    playerGet.stats.currentMP,
                    playerGet.traits.name
                  );
                }

                updatePlayer(playerGet);
              }}
              value={player.stats ? player.stats.currentHP : 0}
              onBlur={() => {
                const playerGet = { ...player };
                if (isNaN(playerGet.stats.currentHP)) {
                  playerGet.stats.currentHP = 0;
                  updatePlayer(playerGet);
                }
              }}
            />
            <Text>Spent:</Text>
            <input
              className="input-stat"
              type="number"
              style={{
                width: 20,
                color: "LightBlue",
              }}
              onChange={(evt) => {
                const playerGet = { ...player };

                let value = parseInt(evt.target.value, 0);
                if (playerGet.stats) {
                  playerGet.stats.currentMP = value;
                } else {
                  playerGet.stats = {
                    defense: 0,
                    mDefense: 0,
                    currentHP: 0,
                    currentMP: value,
                  };
                }

                if (playerGet.linkedStats) {
                  updateGMNoteItem(
                    playerGet.linkedStats.currentStats,
                    playerGet.stats.currentHP,
                    playerGet.stats.currentMP,
                    playerGet.traits.name
                  );
                }

                updatePlayer(playerGet);
              }}
              value={player.stats ? player.stats.currentMP : 0}
              onBlur={() => {
                const playerGet = { ...player };
                if (isNaN(playerGet.stats.currentMP)) {
                  playerGet.stats.currentMP = 0;
                  updatePlayer(playerGet);
                }
              }}
            />
            <Text>DEF:</Text>
            <input
              className="input-stat"
              type="number"
              style={{
                width: 20,
                color: "violet",
              }}
              onChange={(evt) => {
                const playerGet = { ...player };

                let value = parseInt(evt.target.value, 0);
                if (playerGet.stats) {
                  playerGet.stats.defense = value;
                } else {
                  playerGet.stats = {
                    defense: 8,
                    mDefense: 8,
                    currentHP: 0,
                    currentMP: 0,
                  };
                }
                updatePlayer(playerGet);
              }}
              value={player.stats ? player.stats.defense : 0}
            />
            <Text>M.DEF:</Text>
            <input
              className="input-stat"
              type="number"
              style={{
                width: 20,
                color: "cyan",
              }}
              onChange={(evt) => {
                const playerGet = { ...player };

                let value = parseInt(evt.target.value, 0);
                if (playerGet.stats) {
                  playerGet.stats.mDefense = value;
                } else {
                  playerGet.stats = {
                    defense: 8,
                    mDefense: 8,
                    currentHP: 0,
                    currentMP: 0,
                  };
                }
                updatePlayer(playerGet);
              }}
              value={player.stats ? player.stats.mDefense : 0}
              onBlur={() => {
                const playerGet = { ...player };
                if (isNaN(playerGet.stats.mDefense)) {
                  playerGet.stats.mDefense = 0;
                  updatePlayer(playerGet);
                }
              }}
            />
            {(typeof player.linkedStats === "string" ||
              !player.linkedStats ||
              !player.linkedStats.currentStats) && (
              <button
                className="button"
                style={{
                  width: 50,
                  padding: 5,
                  marginLeft: 5,
                  marginRight: 5,
                  color: "orange",
                }}
                onClick={async () => {
                  const selected = await OBR.player.getSelection();
                  if (selected && selected[0]) {
                    const items = await OBR.scene.items.getItems([selected[0]]);

                    const healthBarId = items[0].id + "_healthbar";

                    OBR.scene.items.addItems([
                      {
                        text: {
                          richText: [
                            { type: "paragraph", children: [{ text: "" }] },
                          ],
                          style: {
                            fontSize: 42,
                            padding: 16,
                            fontFamily: "Roboto",
                            fontWeight: 400,
                            textAlign: "LEFT",
                            textAlignVertical: "TOP",
                            fillColor: "#ffffff",
                            fillOpacity: 1,
                            strokeColor: "#222222",
                            strokeOpacity: 1,
                            lineHeight: 1.5,
                            strokeWidth: 9,
                          },
                          plainText: "",
                          type: "RICH",
                          width: "AUTO",
                          height: "AUTO",
                        },
                        grid: {
                          dpi: 150,
                          offset: {
                            y: -60.8902729235092,
                            x: -6.6444149389321865,
                          },
                        },
                        scale: { y: 0.6146155680182349, x: 0.6146155680182349 },
                        position: {
                          x: items[0].position.x - items[0].grid.offset.x,
                          y: items[0].position.y - items[0].grid.offset.y,
                        },
                        type: "IMAGE",
                        attachedTo: items[0].id,
                        id: healthBarId,
                        name: "Healthbox",
                        disableAttachmentBehavior: ["SCALE", "ROTATION"],
                        rotation: 0,
                        visible: true,
                        locked: false,
                        createdUserId: "691aa845-022d-4c0f-948f-4bfc5a4037f3",
                        lastModifiedUserId:
                          "691aa845-022d-4c0f-948f-4bfc5a4037f3",
                        metadata: {},
                        image: {
                          width: 312,
                          height: 164,
                          mime: "image/png",
                          url: "https://images.owlbear.rodeo/691aa845-022d-4c0f-948f-4bfc5a4037f3/items/8e51ab1b-300b-477a-bd43-fcfdad184063.png",
                        },
                        textItemType: "TEXT",
                        layer: "ATTACHMENT",
                        zIndex: 1729524067173,
                        lastModified: "2024-10-21T15:24:14.937Z",
                      },
                    ]);

                    const playerGet = { ...player };
                    if (
                      playerGet.linkedStats &&
                      typeof playerGet.linkedStats !== "string"
                    ) {
                      playerGet.linkedStats.currentStats = healthBarId;
                    } else {
                      playerGet.linkedStats = { currentStats: healthBarId };
                    }

                    updateGMNoteItem(
                      playerGet.linkedStats.currentStats,
                      playerGet.stats.currentHP,
                      playerGet.stats.currentMP,
                      playerGet.traits.name
                    );
                    updatePlayer(playerGet);
                    addGMStatusEffectIcon(playerGet);
                  }
                }}
              >
                Link
              </button>
            )}
            {player.linkedStats && player.linkedStats.currentStats && (
              <button
                className="button"
                style={{
                  width: 40,
                  padding: 5,
                  marginLeft: 5,
                  marginRight: 5,
                  color: "orange",
                }}
                onClick={async () => {
                  const playerGet = { ...player };
                  if (
                    playerGet.linkedStats &&
                    typeof playerGet.linkedStats !== "string"
                  ) {
                    playerGet.linkedStats.currentStats = "";
                  } else {
                    playerGet.linkedStats = { currentStats: "" };
                  }
                  updatePlayer(playerGet);
                }}
              >
                Unlink
              </button>
            )}

            <Text>Calc:</Text>
            <input
              className="input-stat"
              type="number"
              style={{
                width: 20,
                color: "LightGray",
              }}
              value={healthModifier}
              onChange={(evt) => {
                setHealthModifier(evt.target.value);
              }}
              onBlur={() => {
                if (isNaN(parseInt(healthModifier))) {
                  setHealthModifier(0);
                }
              }}
            />
          </span>
          <button
            className="button"
            style={{ width: 50, marginRight: 4, fontSize: 10, marginTop: 2 }}
            onClick={() => {
              const playerGet = { ...player };
              playerGet.stats.currentHP =
                parseInt(playerGet.stats.currentHP) + parseInt(healthModifier);

              if (playerGet.linkedStats) {
                updateGMNoteItem(
                  playerGet.linkedStats.currentStats,
                  playerGet.stats.currentHP,
                  playerGet.stats.currentMP,
                  playerGet.traits.name
                );
              }
              updatePlayer(playerGet);
              showMessage(`Inflicted ${healthModifier} damage!`);
              setHealthModifier(0);
            }}
          >
            Damage
          </button>
          <button
            className="button"
            style={{ width: 50, marginRight: 4, fontSize: 10, marginTop: 2 }}
            onClick={() => {
              const playerGet = { ...player };
              playerGet.stats.currentMP =
                parseInt(playerGet.stats.currentMP) + parseInt(healthModifier);
              if (playerGet.linkedStats) {
                updateGMNoteItem(
                  playerGet.linkedStats.currentStats,
                  playerGet.stats.currentHP,
                  playerGet.stats.currentMP,
                  playerGet.traits.name
                );
              }
              updatePlayer(playerGet);
              showMessage(`Inflicted ${healthModifier} damage!`);
              setHealthModifier(0);
            }}
          >
            Spend
          </button>
        </div>
        <hr />
        <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
          <GMAttribute stat="dex" label="DEX" />
          <GMAttribute stat="ins" label="INS" />
          <GMAttribute stat="mig" label="MIG" />
          <GMAttribute stat="wil" label="WIL" />
          <span className="outline" style={{ marginRight: 4, marginTop: 4 }}>
            DEF:{" "}
            <span className="outline" style={{ color: "violet" }}>
              {(player.stats ? parseInt(player.stats.defense) : 0) +
                getDiceStat(player.attributes.currentdex)}
            </span>
          </span>

          <span className="outline" style={{ marginRight: 4, marginTop: 4 }}>
            M.DEF:{" "}
            <span className="outline" style={{ color: "cyan" }}>
              {(player.stats ? parseInt(player.stats.mDefense) : 0) +
                getDiceStat(player.attributes.currentins)}
            </span>
          </span>
        </div>
        <hr />
        <div style={{ display: "flex", marginTop: 4 }}>
          <GMCondition stat="dex" condition="slow" />
          <GMCondition stat="ins" condition="dazed" />
          <GMCondition stat="mig" condition="weak" />
          <GMCondition stat="wil" condition="shaken" />
          <button
            className="button"
            style={{
              marginRight: 4,
              fontSize: 10,
              width: 50,
              textTransform: "capitalize",
              backgroundColor: player.debuff.enraged ? "darkred" : "#222",
              color: player.debuff.enraged ? "white" : "#ffd433",
            }}
            onClick={async () => {
              const playerGet = { ...player };

              playerGet.debuff.enraged = !player.debuff.enraged;
              playerGet.attributes["currentdex"] = getCurrentAttribute("dex");
              playerGet.attributes["currentins"] = getCurrentAttribute("ins");
              updatePlayer(playerGet);
              sendSkill({
                name:
                  playerGet.traits.name +
                  (playerGet.debuff.enraged ? " suffers" : " recovers from") +
                  " enraged!",
                info: "",
                detail:
                  "Bringing their `DEX` to `INS` one die size " +
                  (playerGet.debuff.enraged ? "lower." : "higher."),
              });

              addGMStatusEffectIcon(playerGet);
            }}
          >
            Enraged
          </button>
          <button
            className="button"
            style={{
              marginRight: 4,
              fontSize: 10,
              width: 50,
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
              sendSkill({
                name:
                  playerGet.traits.name +
                  (playerGet.debuff.poisoned ? " suffers" : " recovers from") +
                  " poisoned!",
                info: "",
                detail:
                  "Bringing their `MIG` to `WIL` one die size " +
                  (playerGet.debuff.poisoned ? "lower." : "higher."),
              });

              addGMStatusEffectIcon(playerGet);
            }}
          >
            Poisoned
          </button>
          <span style={{ color: "grey" }}>|</span>
          <div
            className="outline"
            style={{ display: "flex", alignItems: "center" }}
          >
            <select
              className="attribute-stat"
              style={{ color: "orange", marginLeft: 4 }}
              value={damageTypeSelected}
              onChange={(evt) => {
                setSelectedDamageType(evt.target.value);
              }}
            >
              {damageTypes.map((item) => (
                <option value={item}>
                  {item}
                  {player.affinities &&
                  player.affinities[item] &&
                  player.affinities[item] != "N/A"
                    ? "*"
                    : ""}
                </option>
              ))}
            </select>
            Affinity:{" "}
            <select
              className="attribute-stat"
              style={{ color: "orange", marginLeft: 4 }}
              value={
                player.affinities && player.affinities[damageTypeSelected]
                  ? player.affinities[damageTypeSelected]
                  : "N/A"
              }
              onChange={(evt) => {
                const playerGet = { ...player };
                playerGet.affinities[damageTypeSelected] = evt.target.value;
                updatePlayer(playerGet);
              }}
            >
              <option value={"vu"}>VU</option>
              <option value={"N/A"}>N/A</option>
              <option value={"rs"}>RS</option>
              <option value={"im"}>IM</option>
              <option value={"ab"}>AB</option>
            </select>
            <button
              className="button"
              style={{
                marginLeft: 4,
                fontSize: 10,
                width: 40,
              }}
              onClick={() => {
                sendAffinity(
                  player.traits.name,
                  damageTypeSelected,
                  player.affinities[damageTypeSelected]
                    ? player.affinities[damageTypeSelected]
                    : "na"
                );
              }}
            >
              Send
            </button>
          </div>
        </div>
      </div>
    );
  };

  const renderExportData = () => {
    return (
      <div>
        <div>
          <span style={{ fontSize: 13, color: "White" }} className="outline">
            Export:
          </span>

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
              setTab("stats");
            }}
          >
            Close
          </button>
        </div>
        <hr />
        <Text>
          Copy the text below to export your character. Use import to bring your
          characters to other rooms:
        </Text>
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
          value={exportData}
          readOnly={true}
        ></textarea>
        <button
          className="button"
          style={{
            marginLeft: 4,
            padding: 5,
            float: "right",
            width: 150,
          }}
          onClick={() => {
            navigator.clipboard.writeText(exportData);
            setCopyText(true);
            setTimeout(() => {
              setCopyText(false);
            }, 1500);
          }}
        >
          {copyText ? "Copied to Clipboard" : "Copy Text"}
        </button>
      </div>
    );
  };

  const renderImportData = () => {
    return (
      <div>
        <div>
          <span style={{ fontSize: 13, color: "White" }} className="outline">
            Import:
          </span>
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
              setTab("stats");
            }}
          >
            Close
          </button>
        </div>
        <hr />
        <Text>
          Paste the exported text below to import your character. Use export to
          bring your characters to other rooms:
        </Text>
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
          value={importData}
          onChange={(evt) => {
            setImportData(evt.target.value);
          }}
        ></textarea>
        <button
          className="button"
          style={{
            marginLeft: 4,
            padding: 5,
            float: "right",
            color: "white",
            width: 150,
          }}
          onClick={() => {
            importCharacter();
          }}
        >
          Import
        </button>
      </div>
    );
  };

  if (cookiesNotEnabled) {
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
            height: 500,
            marginTop: 40,
            paddingLeft: 30,
            paddingRight: 30,
          }}
        >
          <div className="outline" style={{ color: "red", font: 14 }}>
            Error:
          </div>
          <div className="outline" style={{ fontSize: 14 }}>
            You need to enable 3rd Party cookies for this extention to work.
            This is because some character data is stored in the browser
            localstorage that enables characters to transfer between scenes.
          </div>
        </div>
      </div>
    );
  }

  if (!isOBRReady) {
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
            height: 500,
            marginTop: 40,
            paddingLeft: 30,
            paddingRight: 30,
          }}
        >
          <div className="outline" style={{ color: "red", font: 14 }}>
            No Scene found.
          </div>
          <div className="outline" style={{ fontSize: 14 }}>
            You need to load a scene to start adding/updating characters. If a
            scene is already loaded, kindly refresh the page.
          </div>
        </div>
      </div>
    );
  }

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
          height: 500,
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
              <div style={{ marginBottom: 30 }}>
                {renderInfo()}
                <hr />
                {renderBonds()}
                <hr />
                {renderStats()}
                {renderDamageAndRestore()}
                <hr />

                {renderItemStats()}
                <div style={{ display: "flex" }}>
                  <div>{renderAttributes()}</div>
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
                      onBlur={() => {
                        const playerGet = { ...player };
                        if (isNaN(playerGet.items.zenit)) {
                          playerGet.items.items = 0;
                          updatePlayer(playerGet);
                        }
                      }}
                    />
                  </span>
                </div>
                {renderNotes()}
              </div>
            )}
            {tab === "skills" && renderCategory()}
            {tab === "actions" && renderActionList()}
            {tab === "link" && renderLinkStats()}
          </>
        ) : (
          <>
            {tab === "export" ? (
              renderExportData()
            ) : tab === "import" ? (
              renderImportData()
            ) : (
              <div>
                {renderPlayerList()}
                {role === "GM" && (
                  <>
                    {renderAdversaryList()}
                    <div style={{ marginTop: 20 }}>
                      <span
                        style={{ fontSize: 13, color: "White" }}
                        className="outline"
                      >
                        Room Saved Adversaries:
                      </span>
                    </div>
                    <hr />
                    {renderLocalAdversaryList()}
                  </>
                )}

                <div style={{ marginTop: 20 }}>
                  <span
                    style={{ fontSize: 13, color: "White" }}
                    className="outline"
                  >
                    Room Saved Character:
                  </span>

                  <button
                    className="button"
                    style={{
                      fontWeight: "bolder",
                      width: 100,
                      float: "right",
                      marginRight: 4,
                    }}
                    onClick={() => {
                      setTab("import");
                      setExportData("");
                      setCopyText(false);
                    }}
                  >
                    Import Character
                  </button>
                </div>
                <hr />
                {renderLocalPlayerList()}
                <div
                  className="outline"
                  style={{
                    marginTop: 20,
                    marginBottom: 5,
                    fontSize: 9,
                    textAlign: "center",
                  }}
                >
                  Join our discord for support, unlock extra features, and
                  report any bugs:
                  <a
                    href="https://discord.gg/2jCNVk6wMK"
                    target="_blank"
                    style={{ textDecoration: "underline", marginLeft: 4 }}
                  >
                    Link Here
                  </a>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {message !== "" && (
        <div
          style={{
            position: "absolute",
            background: "#222",
            borderRadius: 4,
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            margin: "auto",
            width: 300,
            height: 28,
            padding: 8,
            textAlign: "center",
          }}
        >
          <span className="outline" style={{ fontSize: 12 }}>
            {message}
          </span>
        </div>
      )}
    </div>
  );
}

export default App;
