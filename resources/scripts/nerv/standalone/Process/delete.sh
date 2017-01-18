#!/usr/bin/env bash

function delete() {
    if [ -f $APP_PID ]; then
        $APP stop  || return $?
    fi
    rm -rf $APP_ROOT

    if [ $? -ne "0" ]; then
        echo {\"error\":\"rm -rf ${PKG_FILE}\"}
    fi
}

if [ "$pkg_root" == "" ]; then
    echo {\"error\":\"pkg_root is empty\"}
    exit 1
elif [ "$pkg_url" == "" ]; then
    echo {\"error\":\"pkg_url is empty\"}
    exit 1
elif [ "$root" == ""  ]; then
    echo {\"error\":\"root is empty\"}
    exit 1
else
    PKG=${pkg_url##*/}
    APP_ROOT=$root${PKG%%.*}
    APP_PID=APP_ROOT/log/app.pid
    APP=$APP_ROOT/bin/app
    PKG_FILE=${pkg_root}${pkg_url}

    delete
fi

