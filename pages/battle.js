const Battle = (props) => {
  const { data } = props.data;
  return (
    <>
      {data["chosen"] && data["wildAppear"] && (
        <div className={styles.row}>
          {data["wildAppear"].map((npc) => (
            <div
              key={npc.key}
              className={data["chosen"] ? styles.npc : styles.npcConst}
            >
              <img className={styles.image} src={npc.frontImage} />
            </div>
          ))}
          {data["chosen"] && (
            <>
              <div className={styles.user}>
                <div className={styles.userMainContainer}>
                  <div className={styles.npcAttackContainer}>
                    {data["wildMove"] && (
                      <img
                        className={styles.npcAttack}
                        src={data["wildMove"].animation}
                      />
                    )}
                  </div>
                  <div className={styles.userContainer}>
                    <img
                      className={styles.image}
                      src={data["chosen"].backImage}
                    />
                  </div>
                  <div className={styles.userDetails}>
                    <p>
                      {data["chosen"].currentHealth} /{data["chosen"].health}
                    </p>
                    <p>
                      {data["chosen"].currentExperience}/
                      {data["chosen"].totalExperience}
                    </p>
                  </div>
                </div>
              </div>
              <div>
                {data["pokemon"].length > 0 && (
                  <>
                    {data["pokemon"].map((poke, id) => (
                      <button key={poke.key} onClick={switchPokemon(poke, id)}>
                        <img src={poke.frontImage} />
                      </button>
                    ))}
                  </>
                )}
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
};
