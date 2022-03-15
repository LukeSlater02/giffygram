export const footer = () => {
    return `
        <footer class="footer">
            <div class="footer__item">
                Posts since <select id="yearSelection">
                    <option>2020</option>
                    <option>2019</option>
                    <option>2018</option>
                    <option>2017</option>
                </select>
                <span id="postCount">0</span>
                <span style="margin-left: 2em">&copy; Luke Slater Industries, with support from the old folks at the Retirement Home.</span>
            </div>
        </footer>
    `
}