/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import OBR from "@owlbear-rodeo/sdk";
import landingBG from "./assets/bg.jpg";
import refresh from "./assets/refresh.png";
import "./App.css";

document.body.style.overflow = "hidden";

const Text = (props) => {
  const { children } = props;
  return <span className="outline">{children}</span>;
};

const newPlayer = () => {
  return {
    name: "",
    level: 5,
    traits: {
      identity: "",
      theme: "",
      origin: "",
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
      },
    ],
  };
};

function App() {
  const [isOBRReady, setIsOBRReady] = useState(false);
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [role, setRole] = useState("PLAYER");
  const [metadata, setMetadata] = useState([]);
  const [playerList, setPlayerList] = useState({});
  const [player, setPlayer] = useState({});
  const [tab, setTab] = useState("stats");

  useEffect(() => {
    OBR.onReady(async () => {
      const metadata = await OBR.scene.getMetadata();
      if (metadata["ultimate.story.extension/metadata"]) {
        // const currentChat = createChatArray(metadata);
        // setChat(currentChat);
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

  useEffect(() => {
    if (isOBRReady) {
    }
  }, [isOBRReady]);

  const addRoll = () => {
    const newMessage = {
      id: Date.now(),
      user: name,
      diceOneResult,
      diceTwoResult,
      diceLabelOne: role === "GM" ? "" : diceLabelOne,
      diceLabelTwo: role === "GM" ? "" : diceLabelTwo,
      damage,
      bonus,
      useHR,
    };
    const newChat = [...myChat, newMessage];

    let metadataChange = { ...metadata };
    metadataChange[id] = newChat;

    OBR.scene.setMetadata({
      "last.fable.extension/metadata": metadataChange,
    });
  };

  const generateRandomNumber = (end) => {
    var range = end;
    var randomNum = Math.floor(Math.random() * range) + 1;

    return randomNum;
  };

  const getRandomNumberByDice = (dice) => {
    if (dice === "d4") {
      return generateRandomNumber(4);
    }
    if (dice === "d6") {
      return generateRandomNumber(6);
    }
    if (dice === "d8") {
      return generateRandomNumber(8);
    }
    if (dice === "d10") {
      return generateRandomNumber(10);
    }
    if (dice === "d12") {
      return generateRandomNumber(12);
    }
    if (dice === "d20") {
      return generateRandomNumber(20);
    }
  };

  const saveStats = (replace) => {
    localStorage.setItem(
      "last.fable.extension/metadata",
      JSON.stringify({
        dex,
        ins,
        mig,
        wil,
        damage,
        bonus,
        preparedDice,
        ...replace,
      })
    );
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
          value={"60"}
          onChange={(evt) => {
            //setText(evt.target.value);
          }}
        />
        <Text>MP: </Text>
        <input
          className="input-stat"
          style={{
            width: 20,
            color: "LightBlue",
          }}
          readOnly={true}
          value={"40"}
          onChange={(evt) => {
            //setText(evt.target.value);
          }}
        />
        <Text>IP: </Text>
        <input
          className="input-stat"
          style={{
            width: 20,
            color: "Orange",
          }}
          readOnly={true}
          value={"8"}
          onChange={(evt) => {
            //setText(evt.target.value);
          }}
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
            paddingTop: 5,
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
            value={"Lux Von Carnage"}
            onChange={(evt) => {
              //setText(evt.target.value);
            }}
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
            value={"Belonging"}
            onChange={(evt) => {
              //setText(evt.target.value);
            }}
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
            value={"Axis City"}
            onChange={(evt) => {
              //setText(evt.target.value);
            }}
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
            value={"A eccentric and naive former slave mage who lost her home"}
            onChange={(evt) => {
              //setText(evt.target.value);
            }}
          />

          <Text>LVL:</Text>
          <input
            className="input-stat"
            style={{
              width: 20,
              color: "white",
            }}
            value={"10"}
            onChange={(evt) => {
              //setText(evt.target.value);
            }}
          />
        </div>
      </>
    );
  };

  const Bond = () => {
    return (
      <div>
        <input
          className="input-stat"
          style={{
            width: 60,
            color: "white",
            marginLeft: 0,
            fontSize: 8,
          }}
          value={"Lucas Von Vanguard"}
          onChange={(evt) => {
            //setText(evt.target.value);
          }}
        />
        <select
          className="bond-stat"
          value={"Admiration"}
          onChange={(evt) => {
            //setText(evt.target.value);
          }}
        >
          <option value=""></option>
          <option value="Admiration">Admiration</option>
          <option value="Inferiority">Inferiority</option>
        </select>
        <select
          className="bond-stat"
          value={"Loyalty"}
          onChange={(evt) => {
            //setText(evt.target.value);
          }}
        >
          <option value=""></option>
          <option value="Loyalty">Loyalty</option>
          <option value="Mistrust">Mistrust</option>
        </select>
        <select
          className="bond-stat"
          value={"Affection"}
          onChange={(evt) => {
            //setText(evt.target.value);
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
        <Bond></Bond>
        <Bond></Bond>
        <Bond></Bond>
        <Bond></Bond>
        <Bond></Bond>
        <Bond></Bond>
      </div>
    );
  };

  const Attribute = (props) => {
    const { stat, condition } = props;
    return (
      <div>
        <div>
          <Text>{stat}:</Text>
        </div>
        <select
          className="attribute-stat"
          value={"d12"}
          onChange={(evt) => {
            //setText(evt.target.value);
          }}
        >
          <option value="d12">d12</option>
          <option value="d10">d10</option>
          <option value="d8">d8</option>
          <option value="d6">d6</option>
        </select>
        <Text>d12</Text>
        <button
          className="button"
          style={{ marginLeft: 4, fontSize: 8, width: 40 }}
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
        <Attribute stat="Dexterity" condition="Slow" />
        <Attribute stat="Insight" condition="Dazed" />
        <Attribute stat="Might" condition="Weak" />
        <Attribute stat="Willpower" condition="Shaken" />
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
              width: 322,
              color: "white",
              margin: 0,
              fontSize: 10,
            }}
            value={""}
            onChange={(evt) => {
              //setText(evt.target.value);
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
              width: 322,
              color: "white",
              margin: 0,
              fontSize: 10,
            }}
            value={"Sage Robe DEF Dex + 1 M.DEF Ins +2 150z"}
            onChange={(evt) => {
              //setText(evt.target.value);
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
              width: 322,
              color: "white",
              margin: 0,
              fontSize: 10,
            }}
            value={
              "Valencia (Heavy Spear) 500 z 【DEX + MIG】+1【HR + 16】physical two-handed (Extra Damage, Extra Accuracy)"
            }
            onChange={(evt) => {
              //setText(evt.target.value);
            }}
          />
        </div>
        <div>
          <div>
            <Text>Off Hand: </Text>
          </div>
          <input
            autocomplete="off"
            className="input-stat"
            style={{
              width: 322,
              color: "white",
              margin: 0,
              fontSize: 10,
            }}
            value={""}
            onChange={(evt) => {
              //setText(evt.target.value);
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
          style={{
            width: 20,
            color: "violet",
          }}
          value={"12"}
          onChange={(evt) => {
            //setText(evt.target.value);
          }}
        />
        <Text>Magic Defense: </Text>
        <input
          className="input-stat"
          style={{
            width: 20,
            color: "cyan",
          }}
          value={"10"}
          onChange={(evt) => {
            //setText(evt.target.value);
          }}
        />
        <Text>Init. Modifier: </Text>
        <input
          className="input-stat"
          style={{
            width: 20,
            color: "lightgrey",
          }}
          value={"-2"}
          onChange={(evt) => {
            //setText(evt.target.value);
          }}
        />
        <Text>Experience: </Text>
        <input
          className="input-stat"
          style={{
            width: 20,
            color: "lightgrey",
          }}
          value={"9"}
          onChange={(evt) => {
            //setText(evt.target.value);
          }}
        />
        <Text>Zenit: </Text>
        <input
          className="input-stat"
          style={{
            width: 54,
            color: "gold",
            marginRight: 0,
          }}
          value={"1000"}
          onChange={(evt) => {
            //setText(evt.target.value);
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
          value={""}
          placeholder={"Melee/Armor/Ritualism/Elementalism/Etc."}
          onChange={(evt) => {
            //setText(evt.target.value);
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
          value={"5"}
          onChange={(evt) => {
            //setText(evt.target.value);
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
          value={"5"}
          onChange={(evt) => {
            //setText(evt.target.value);
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
          value={"2"}
          onChange={(evt) => {
            //setText(evt.target.value);
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
        cols="88"
        style={{ textAlign: "left", color: "#FFF", height: 150 }}
      ></textarea>
    );
  };

  const Skill = () => {
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
            value={"Counter Attack"}
            onChange={(evt) => {
              //setText(evt.target.value);
            }}
          />
          <Text>Info: </Text>
          <input
            className="input-stat"
            style={{
              width: 240,
              color: "lightgrey",
            }}
            value={""}
            placeholder="Level/Target/MP Cost/Duration/Damage/Other"
            onChange={(evt) => {
              //setText(evt.target.value);
            }}
          />
          <button className="button" style={{ marginRight: 4 }}>
            Show
          </button>
          <button className="button" style={{ width: 25, color: "darkred" }}>
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
          }}
          onChange={() => {}}
          value={
            "After an enemy hits or misses you with a melee attack, if the Result of their Accuracy Check was an even number, you may perform a free attack against that enemy (after their attack has been fully resolved). This attack must be a melee attack and must have that enemy as its only target; treat your High Roll (HR) as 0 when calculating damage dealt by this attack."
          }
        ></textarea>
      </div>
    );
  };

  const renderSkills = () => {
    return (
      <div>
        <Skill></Skill>
        <Skill></Skill>
        <Skill></Skill>
      </div>
    );
  };

  const Category = () => {
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
            value={""}
            placeholder="Class/Spells/Projects/Skills/Other"
            onChange={(evt) => {
              //setText(evt.target.value);
            }}
          />
          <Text>Info: </Text>
          <input
            className="input-stat"
            style={{
              width: 190,
              color: "lightgrey",
            }}
            value={""}
            placeholder="Free Benefits/Tracker/Other"
            onChange={(evt) => {
              //setText(evt.target.value);
            }}
          />
          <div style={{ display: "flex", justifyContent: "center" }}>
            <button
              className="button"
              style={{ fontWeight: "bolder", width: 25, marginRight: 4 }}
            >
              +
            </button>
          </div>
          <button
            className="button"
            style={{ fontWeight: "bolder", width: 25, color: "darkred" }}
          >
            ✖
          </button>
        </div>
        <hr style={{ marginBottom: 10 }} />
        {renderSkills()}
      </div>
    );
  };

  const renderCategory = () => {
    return (
      <div>
        <div>
          <Text>Search By Name: </Text>
          <input
            className="input-stat"
            style={{
              width: 120,
              color: "lightgrey",
            }}
            value={""}
            onChange={(evt) => {
              //setText(evt.target.value);
            }}
          />
          <button
            className="button"
            style={{ fontWeight: "bolder", width: 40 }}
          >
            Clear
          </button>
          <button
            className="button"
            style={{ fontWeight: "bolder", width: 80, float: "right" }}
          >
            Add Category
          </button>
        </div>
        <Category />
        <Category />
      </div>
    );
  };

  const Action = () => {
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
            value={"Gun Fire"}
            onChange={(evt) => {
              //setText(evt.target.value);
            }}
          />
          <Text>Info: </Text>
          <input
            className="input-stat"
            style={{
              width: 258,
              color: "lightgrey",
            }}
            value={""}
            placeholder="Level/Target/MP Cost/Duration/Damage/Other"
            onChange={(evt) => {
              //setText(evt.target.value);
            }}
          />

          <button className="button" style={{ width: 25, color: "darkred" }}>
            ✖
          </button>
        </div>
        <div style={{ display: "flex", alignItems: "center", marginTop: 4 }}>
          <Text>Dice One: </Text>
          <select
            className="attribute-stat"
            value={"dex"}
            onChange={(evt) => {
              //setText(evt.target.value);
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
          <Text>Dice Two: </Text>
          <select
            className="attribute-stat"
            value={"ins"}
            onChange={(evt) => {
              //setText(evt.target.value);
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
          <Text>Bonus/Penalty</Text>
          <input
            className="input-stat"
            style={{
              width: 20,
              color: "lightblue",
            }}
            value={"-2"}
            onChange={(evt) => {
              //setText(evt.target.value);
            }}
          />
          <Text>Damage</Text>
          <input
            className="input-stat"
            style={{
              width: 20,
              color: "red",
            }}
            value={"10"}
            onChange={(evt) => {
              //setText(evt.target.value);
            }}
          />
          <button className="button" style={{ marginRight: 4 }}>
            Roll
          </button>
          <button className="button" style={{ width: 25, marginRight: 4 }}>
            ↑
          </button>
          <button className="button" style={{ width: 25 }}>
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
          }}
          value={
            "After an enemy hits or misses you with a melee attack, if the Result of their Accuracy Check was an even number, you may perform a free attack against that enemy (after their attack has been fully resolved). This attack must be a melee attack and must have that enemy as its only target; treat your High Roll (HR) as 0 when calculating damage dealt by this attack."
          }
        ></textarea>
        <hr />
      </div>
    );
  };

  const renderActionList = () => {
    return (
      <div>
        <div>
          <Text>Search By Name: </Text>
          <input
            className="input-stat"
            style={{
              width: 120,
              color: "lightgrey",
            }}
            value={""}
            onChange={(evt) => {
              //setText(evt.target.value);
            }}
          />
          <button
            className="button"
            style={{ fontWeight: "bolder", width: 40 }}
          >
            Clear
          </button>
          <button
            className="button"
            style={{ fontWeight: "bolder", width: 80, float: "right" }}
          >
            Add Action
          </button>
        </div>
        <hr />
        <Action />
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
        style={{
          overflow: "scroll",
          height: windowInnerHeight - 40,
          marginTop: 20,
          paddingLeft: 30,
          paddingRight: 30,
        }}
      >
        {renderNav()}
        <hr />
        {tab === "stats" && (
          <div>
            {renderInfo()}
            <hr />
            {renderBonds()}
            <hr />
            {renderItemStats()}
            <div style={{ display: "flex" }}>
              <div style={{ width: 110 }}>{renderAttributes()}</div>
              <div>{renderSecondaryCondition()}</div>
              <div>{renderEquipment()}</div>
            </div>
            {renderMartialUnlocked()}
            <hr />

            <div>
              <Text>Character Notes/Backpack</Text>
            </div>
            {renderNotes()}
          </div>
        )}
        {tab === "skills" && renderCategory()}
        {tab === "actions" && renderActionList()}
      </div>
    </div>
  );
}

export default App;
