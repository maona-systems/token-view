#!/bin/tcsh

set CLEF_config="/Users/admin8/Home/clef/";

set CLEF_keystore="/Users/admin8/Home/clef/keystore";

set CLEF_seed="/Users/admin8/Home/clef/masterseed.json";

set CLEF_rules="./scripts/rules.js";

set CLEF_address="d9dff16193d3ac787f09f09a96ec98bee47a78c4";

# clef --configdir $CLEF_config init;

# clef --configdir $CLEF_config --keystore $CLEF_keystore --signersecret $CLEF_seed newaccount;

# clef --keystore $CLEF_keystore list-accounts;

# clef --configdir $CLEF_config attest `shasum -a 256 $CLEF_rules | awk '{print $1}'`;

clef --stdio-ui --configdir $CLEF_config --keystore $CLEF_keystore --signersecret $CLEF_seed --rules $CLEF_rules;