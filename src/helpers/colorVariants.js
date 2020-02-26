import Color from 'color'

export default function colorVariants (str, reverse = false) {
    let c = Color(str)
    let keys = [100, 200, 300, 400, 500, 600, 700, 800, 900]
    if (reverse) keys = keys.reverse()
    let variants = {
        [keys[0]]: c.lighten(.95).hex(),
        [keys[1]]: c.lighten(.75).hex(),
        [keys[2]]: c.lighten(.50).hex(),
        [keys[3]]: c.lighten(.25).hex(),
        [keys[4]]: c.hex(),
        [keys[5]]: c.darken(.20).hex(),
        [keys[6]]: c.darken(.40).hex(),
        [keys[7]]: c.darken(.60).hex(),
        [keys[8]]: c.darken(.80).hex(),
    }
    return variants
}