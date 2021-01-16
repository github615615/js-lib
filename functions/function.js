
        /* *
         * 格式化json字符串，必须在pre标签中，
         *  @params json{String | Object}参数可以是一个json对象，或者是一个json字符串,或者是一个转义后的json字符串,
         *  @return {String} 返回格式化完毕的js字符串，必须在pre标签中才行
         *  */
      export  function formatJson(json) {
            var outStr = '', //转换后的json字符串
                padIdx = 0, //换行后是否增减PADDING的标识
                space = '    '; //4个空格符
            if (typeof json !== 'string') {
                json = JSON.stringify(json);
            }

            json = json.replace(/([\{\}\[\]])/g, '\r\n$1\r\n')
                .replace(/(\,)/g, '$1\r\n')
                .replace(/(\r\n\r\n)/g, '\r\n');
            (json.split('\r\n')).forEach(function(node, index) {
                var indent = 0,
                    padding = '';
                if (node.match(/[\{\[]/)) {
                    indent = 1;
                } else if (node.match(/[\}\]]/)) {
                    padIdx = padIdx !== 0 ? --padIdx : padIdx;
                } else {
                    indent = 0;
                }
                for (var i = 0; i < padIdx; i++) {
                    padding += space;
                }
                outStr += padding + node + '\r\n';
                padIdx += indent;
            });
            return outStr;
        };
