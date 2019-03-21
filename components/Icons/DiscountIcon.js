import React from "react";

export default class DiscountIcon extends React.Component {
  render() {
    return (
      <span className="wrapper">
        <svg width="17" height="17" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M1.30104007 10.6538938l6.8288039 5.73004684c.6525159.54752585 1.62617729.46235387 2.173714-.19017497l6.30158375-7.50993508c.30155545-.3593798.42313398-.83689795.33020254-1.29708415l-1.1288598-5.58869085c-.14364777-.70273168-.75181873-1.2130477-1.46881844-1.232485L8.63264786.41995694c-.46934564-.01162029-.918484.19104253-1.22003946.55042232L1.11102465 8.48031435c-.2630456.31348554-.39048346.7185289-.35480181 1.12621703.03568171.40768804.23150484.78446224.54497742 1.04749697l-.00016019-.00013455zm9.33054222 1.95404059c-.6285001.74901727-1.67382826.91008014-2.3159156.37130489-.64216997-.53973422-.67250742-1.59357822-.03961514-2.34782987.63286985-.7542249 1.6738282-.91008006 2.31591554-.3713048.64260803.53921215.66725257 1.5998407.0396152 2.34782978zm1.33822091-4.87336788c.08862894.23969378-.03309943.50554652-.27219393.59556586L5.52986872 10.6637719c-.23952475.0905456-.50763422-.0295266-.59870834-.2695063-.09107971-.23997303.02952666-.5076343.26898554-.5991453l6.16774054-2.33363967c.11601208-.04398018.2448501-.0407501.3580992.010725.11324903.05147518.201244.14575428.24382971.26237345l-.00001217-.00001257zm1.44601949-4.5844947c.35467957.2976115.49549895.78020916.35625555 1.22156105-.1396803.44187258-.53122125.75596353-.99264363.7963415-.46140715.04036789-.90154446-.20095702-1.11584647-.61187258-.21376786-.41046735-.15889004-.9101863.13872146-1.26486587.40659684-.48456325 1.12892532-.5477588 1.6134885-.14116202l.00002459-.00000208zM8.58441777 5.15807082c.64469106.54096003.66673181 1.59940374.03819808 2.34846107-.62853373.74905733-1.67382834.91008007-2.3159156.37130488-.64208727-.53877518-.66543893-1.59565663-.0364906-2.34520805.62797805-.74945533 1.66481678-.91946194 2.31420812-.3745579zM6.97906145 6.127426c.29455273-.35103427.7558774-.4697013 1.0083406-.25785952.25246311.2118417.21614406.68624337-.07884564 1.0377984-.29455273.35103428-.75587746.46970139-1.00834058.25785967-.2524632-.21184177-.2192141-.6825848.07884562-1.03779855zm2.01274931 5.10207373c.29455267-.3510342.7558774-.46970131 1.0083406-.25785953.2524632.21184177.21614407.68624352-.07884556 1.03779847-.29455273.35103427-.75587746.46970138-1.00834066.2578596-.2524632-.21184177-.2192141-.6825848.07752347-1.03622287l.00132215-.00157567z"
            fill="#FFF"
            fillRule="evenodd"
          />
        </svg>
        <style jsx>{`
          .wrapper {
            display: inline-flex;
            justify-content: center;
            align-items: center;
            position: relative;
            width: 2.3rem;
            height: 2.3rem;
            margin: 0;
            background-color: var(--color-primary);
            font-weight: 700;
            border-radius: 50%;
            overflow: hidden;
            transition: all 300ms ease-in-out;
          }
        `}</style>
      </span>
    );
  }
}
