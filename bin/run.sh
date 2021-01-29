#!/bin/bash

if [[ -z "$S_PORT" ]]; then 
  export S_PORT=$((31000 + $RANDOM % 1000)); 
fi
if [[ -z "$C_PORT" ]]; then 
  export C_PORT=$((32000 + $RANDOM % 1000)); 
fi

if [[ -z "$REVISION" ]]; then
  REVISION=local
fi

check_error() {
  if [ "$1" -ne 0 ]; then
    exit "$1"
  fi
}

function usage {
  echo "usage: $0 [OPTIONS]";
  echo "Options:"
  echo "    -h, --help     :  Display this menu";
  echo "    -e, --env      :  Specify environment, possible choices: [dev,prod], (default, dev)";
  echo "    -d, --deploy   :  Create the production deployment only"
  echo ""
}

function check_client_dependencies {
  if [ ! -d "${REPO_ROOT}/client/node_modules" ]; then
    # install all dependencies into node_modules
    npm install --prefix ${REPO_ROOT}/client
  fi
}

function deploy {
  echo "Building the Server for PRODUCTION"
  echo

  # Check if Node Modules are Installed

  check_client_dependencies;

  # Build The Client


  pushd $REPO_ROOT/client > /dev/null;
  npm run test;
  check_error $?
  popd > /dev/null;


  npm run prodClient --prefix ${REPO_ROOT}/client
  check_error $?

  # Build and Package the JAVA Server


  mvn -f ${REPO_ROOT}/server --global-settings ${REPO_ROOT}/server/.m2/settings.xml -Drevision=${REVISION} clean verify
  check_error $?

}

function run_dev {
	echo "Building and Starting the Server in DEVELOPMENT Mode."
	echo

  # Build and Package the JAVA Server
  mvn -f ${REPO_ROOT}/server --global-settings ${REPO_ROOT}/server/.m2/settings.xml -Drevision=${REVISION} clean package
  check_error $?

  # Check if Node Modules are Installed

  check_client_dependencies;

  # Build and Run The Client / Run The Server

  npm run test --prefix ${REPO_ROOT}/client
  check_error $?

  npm run dev --prefix ${REPO_ROOT}/client
  check_error $?
}

function run_prod {
	echo "Building and Starting the Server in PRODUCTION Mode."
  echo

  # Build and Package the JAVA Server With Client

  deploy

  # Run The Server

  npm run server --prefix ${REPO_ROOT}/client
  check_error $?
}

realpath() {
    [[ $1 = /* ]] && echo "$1" || echo "$PWD/${1#./}";
}

function get_repo_root_dir {
  dir="$(realpath $1)";
  while [[ ! -d "$dir/.git" ]];
  do
    dir=`echo $dir | sed 's~\(.*\)/.*~\1~'`;
  done;

  export REPO_ROOT=$dir;

}

# set prefix directory for relative path resolution
get_repo_root_dir $0;

# parse args
PARAMS=""
while (( "$#" )); do
  case "$1" in
    -h|--help)
      usage;
      exit 0;
      ;;
    -e|--env)
      if [ -n "$2" ] && [ ${2:0:1} != "-" ]; then
        if [[ "$2" != "dev" && "$2" != "prod" ]]; then
          echo "\"$2\" is not a valid environment choice";
          usage;
          exit;
        fi
        CS314_ENV=$2
        shift 2
      else
        echo "argument missing for -- $1" >&2
        exit 1
      fi
      ;;
    -d|--deploy)
      deploy;
      exit;
      ;;
    -*|--*=) # unsupported flags
      echo "unrecognized option -- $(echo $1 | sed 's~^-*~~')" >&2
      usage;
      exit 1
      ;;
    *) # preserve positional arguments
      PARAMS="$PARAMS $1"
      shift
      ;;
  esac
done

eval set -- "$PARAMS";

if [[ -z "$CS314_ENV" ]]; then
  CS314_ENV=dev;
fi;

if [[ "$CS314_ENV" == "dev" ]]; then
  run_dev;
else
  run_prod;
fi
