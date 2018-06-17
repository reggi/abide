USAGE="--rmPropAll <prop> (removes a prop from all packages)"
function rmPropAll () {
  lerna exec -- 'source ../../scripts/9999-import.sh && import && rmProp '$1''
}
