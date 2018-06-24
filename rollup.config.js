import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import commonJS from 'rollup-plugin-commonjs';
import { uglify } from 'rollup-plugin-uglify';
import serve from 'rollup-plugin-serve';

const configuration = {
    input: 'src/index.js',
    output: {
        file: 'public/app.js',
        format: 'cjs'
    },
    plugins: [
        babel({
            exclude: 'node_modules/**'
        }),
        resolve(),
        commonJS({
            include: 'node_modules/**'
        }),
        serve({
            contentBase: 'public',
            port: 8080
        })
    ]
};

if (process.env.PRODUCTION)
    configuration.plugins.push(uglify());

export default configuration;