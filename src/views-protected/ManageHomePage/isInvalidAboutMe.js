const isInvalidAboutMe = (value) => {
    let pat = /^(?<part1>.*):(?<part2>.*)$/;

    let fail = false;
    if ('secondaryValues' in value) {
        Object.keys(value['secondaryValues']).forEach((key) => {
            if (!pat.exec(value['secondaryValues'][key])) {
                alert(`Reread instructions bitch! ${key} needs a semicolon. You lucky I put this check unless you would have crashed the website! Fix this: "${value['secondaryValues'][key]}"`)
                fail = true
            }

        });

    }
    return fail
};

export default isInvalidAboutMe