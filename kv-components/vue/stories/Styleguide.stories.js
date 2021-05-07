export default {
	title: 'BaseStyling',
};

export const HTMLKitchenSink = (args, { argTypes }) => ({
	props: Object.keys(argTypes),
	template: `
	<div class="container">
		<header role="banner">
			<h1>HTML Kitchen Sink</h1>
			<small>Jump to: <a href="#headings">Headings</a> |
				<a href="#sections">Sections</a> | <a href="#phrasing">Phrasing</a> |
				<a href="#palpable">Palpable Content</a> | <a href="#embeds">Embeds</a> |
				<a href="#forms">Forms</a> | <a href="#tables">Tables</a>
			</small>
		</header>
		<section id="headings" class="my-6">
			<h3 class="mb-2"><a href="#headings">#</a> Headings and pangrams</h3>
			<h1 class="text-jumbo">Oh hi there! 👋</h1>
			<h1 class="mb-4 mt-4">.text-h1 - A wizard’s job is to vex chumps quickly in fog.</h1>
			<h2 class="mb-4">.text-h2 - Amazingly few discotheques provide jukeboxes</h2>
			<h3 class="mb-2">.text-h3 - Sixty zippers were quickly picked from the woven jute bag</h3>
			<h4>.text-h4 - Five or six big jet planes zoomed quickly by the new tower.</h4>
			<p class="text-subhead">.text-subhead - Sphinx of black quartz, judge my vow.</p>
			<p class="text-base">.text-base - Quixotic jugglers repent; wave away fake methods and brazen mishaps.</p>
			<p class="text-small">.text-small - We promptly judged antique ivory buckles for the next prize.</p>
			<footer class="mt-3">
				<p>
					See the
					<a target="_blank" href="https://www.w3.org/TR/html5/dom.html#heading-content">Heading Content spec.</a>
				</p>
			</footer>
		</section>
		<main class="prose">
			<section id="sections" class="my-6">
				<header>
					<h3 class="mb-2"><a href="#sections">#</a> Sections</h3>
					<p>
						Elements <code>article</code>, <code>aside</code>, <code>nav</code>,
						<code>section</code> make up the <em>sectioning content</em> category.
					</p>
					<nav>
						<p>These links are contained in a <code>nav</code> element.</p>
						<ul>
							<li><a href="#">Home</a></li>
							<li><a href="#">About</a></li>
							<li><a href="#">Contact</a></li>
						</ul>
					</nav>
				</header>
				<article>
					<p>
						This paragraph is nested inside an <code>article</code> element. It
						contains many different, sometimes useful,
						<a href="http://www.w3schools.com/tags/">HTML5 elements</a>. Of course
						there are classics like <em>emphasis</em>, <strong>strong</strong>, and
						<small>small</small> but there are many others as well. Hover the
						following text for abbreviation element:
						<abbr title="abbreviation">abbr</abbr>. You can define
						<del>deleted text</del> which often gets replaced with
						<ins>inserted</ins> text.
					</p>
					<p>
						You can also use <kbd>keyboard text</kbd>, which sometimes is styled
						similarly to the <code>&lt;code&gt;</code> or
						<samp>samp</samp> elements. Even more specifically, there is an element
						just for <var>variables</var>. Not to be mistaken with block quotes
						below, the quote element lets you denote something as
						<q>quoted text</q>. Lastly don't forget the sub (H<sub>2</sub>O) and sup
						(E = MC<sup>2</sup>) elements.
					</p>
					<section>
						<p>
							This paragraph is contained in a <code>section</code> element of its
							parent <code>article</code> element.
						</p>
						<p>
							↓ The following paragraph has the <code>hidden</code> attribute and
							should not be displayed. ↓
						</p>
						<p hidden>→ You should not see this paragraph. ←</p>
						<p>↑ The previous paragraph should not be displayed. ↑</p>
					</section>
				</article>
				<aside>
					<p>This is contained in an <code>aside</code> element.</p>
				</aside>
				<footer>
					<p>
						See the
						<a target="_blank" href="https://www.w3.org/TR/html5/dom.html#sectioning-content">Sectioning Content
							spec.</a>
					</p>
				</footer>
			</section>
			<hr />
			<section id="phrasing" class="my-6">
				<header>
					<h3 class="mb-2"><a href="#phrasing">#</a> Phrasing</h3>
					<p>
						Elements <code>abbr</code>, <code>b</code>, <code>bdi</code>,
						<code>bdo</code>, <code>br</code>, <code>cite</code>, <code>code</code>,
						<code>data</code>, <code>del</code>, <code>dfn</code>, <code>em</code>,
						<code>i</code>, <code>ins</code>, <code>kbd</code>, <code>mark</code>,
						<code>meter</code>, <code>progress</code>, <code>q</code>,
						<code>s</code>, <code>samp</code>, <code>small</code>,
						<code>span</code>, <code>strong</code>, <code>sub</code>,
						<code>sup</code>, <code>time</code>, <code>u</code>, <code>var</code>,
						<code>wbr</code>, and others make up the
						<em>phrasing content</em> category.
					</p>
				</header>
				<p>
					<code>abbr</code>: Some vehicles meet the
					<abbr title="Super Ultra Low Emission Vehicle">SULEV</abbr>
					standard.<br />
					<code>br</code> was used to make this sentence start on a new line.
				</p>
				<p>
					<code>bdi</code>: Some languages read right to left,
					<bdi lang="ar">مرحبا</bdi>. <code>bdo</code>:
					<bdo dir="rtl">The normal direction has been overridden.</bdo>
				</p>
				<p>
					<code>em</code> is used for <em>emphasis</em> and usually renders as
					italics, contrast that with <code>i</code> which is used for alternate
					voice or to offset from the normal (such as a phrase from a different
					language or taxonomic designation): <i>E. coli</i> can be bad.
					<code>strong</code> is used for <strong>importance or urgency</strong> and
					usually renders as bold, contrast that with <code>b</code> which is used
					to <b>draw attention</b> without the semantic meaning of importance.
				</p>
				<p>
					<code>cite</code>: In the words of <cite>Charles Bukowski</cite> —
					<q>An intellectual says a simple thing in a hard way. An artist says a
						hard thing in a simple way.</q>
				</p>
				<p>
					<code>data</code> can be used to specify
					<data value="2018-09-24T05:00-07:00">5 A.M.</data> that is
					machine-readable, but <code>time</code> is a better choice for specifying
					<time datetime="2018-09-24T05:00-07:00">5 A.M.</time> in a
					machine-readable format.
				</p>
				<p>
					<code>del</code> can be
					<del datetime="2017-10-11T01:25-07:00">varily</del> used to mark
					deletions. <code>ins</code> marks
					<ins datetime="2007-12-19 00:00Z">insertions</ins>. <code>s</code>:
					similar to <code>del</code>, but used to mark content that is no longer
					relevant. <s>Windows XP version available.</s> <code>u</code>: a holdover
					with no real meaning that should be <u>removed</u>. <code>mark</code>: the
					HTML equivalent of the <mark>yellow highlighter</mark>. <code>span</code>:
					a <span>generic element</span> with no meaning by itself.
				</p>
				<p>
					<code>dfn</code>: Foreign phrases add a certain
					<dfn lang="fr" title="French: indefinable quality">je ne sais quoi</dfn>
					to one's prose.
				</p>
				<p>
					<code>q</code>: The W3C page <cite>About W3C</cite> says the W3C’s mission
					is
					<q cite="https://www.w3.org/Consortium/">To lead the World Wide Web to its full potential by developing
						protocols and guidelines that ensure long-term growth for the Web</q>.
				</p>
				<p><code>kbd</code> and <code>samp</code>: I did this:</p>
				<pre><samp>c:&gt;<kbd>format c: /yes</kbd></samp></pre>
				<p>
					Is that bad? Press <kbd><kbd>Ctrl</kbd></kbd>+<kbd><kbd>F5</kbd></kbd> for a hard reload.
				</p>
				<p>
					<code>var</code>: To log in, type
					<kbd>ssh <var>user</var>@example.com</kbd>, where <var>user</var> is your
					user ID.
				</p>
				<p>
					<code>meter</code> and <code>progress</code>: Storage space usage:
					<meter value="6" max="8">6 blocks used (out of 8 total)</meter> Progress:
					<progress value="37" max="100">37%</progress>
				</p>
				<p>
					<code>sub</code> is used for subscripts: H<sub>2</sub>O.
					<code>sup</code> is used for superscripts: E = MC<sup>2</sup>.
					<code>small</code> is used for side comments:
					<q>I wrote this whole document.
						<small>[Editor's note: no he did not]</small></q>
					<code>wbr</code>: used to specify where a word may break and it is
					super<wbr />cali<wbr />fragil<wbr />istic<wbr />expiali<wbr />do<wbr />cious.
				</p>
				<footer>
					<p>
						See the
						<a target="_blank" href="https://www.w3.org/TR/html5/dom.html#phrasing-content">Phrasing Content
							spec.</a>
					</p>
				</footer>
			</section>
			<hr />
			<section id="palpable" class="my-6">
				<header>
					<h3 class="mb-2"><a href="#palpable">#</a> Palpable Content</h3>
					<p>
						Elements <code>a</code>, <code>address</code>, <code>blockquote</code>,
						<code>button</code>, <code>details</code>, <code>dl</code>,
						<code>fieldset</code>, <code>figure</code>, <code>form</code>,
						<code>input</code>, <code>label</code>, <code>map</code>,
						<code>ol</code>, <code>output</code>, <code>pre</code>,
						<code>select</code>, <code>table</code>, <code>textarea</code>,
						<code>ul</code>, and others make up the
						<em>palpable content</em> category.
					</p>
				</header>
				<p><code>a</code>: <a href="http://example.com">Example</a>.</p>
				<p><code>address</code>:</p>
				<address>
					1 Infinite Loop<br />
					Cupertino, CA 95014<br />
					United States
				</address>
				<p><code>blockquote</code>:</p>
				<blockquote>
					<p>I quickly explained that many big jobs involve few hazards</p>
				</blockquote>
				<blockquote>
					<p>
						This is a mult-line blockquote with a cite reference. People think focus
						means saying yes to the thing you’ve got to focus on. But that’s not
						what it means at all. It means saying no to the hundred other good ideas
						that there are. You have to pick carefully. I’m actually as proud of the
						things we haven’tdone as the things I have done. Innovation is saying no
						to 1,000 things.
					</p>
					<footer>
						Steve Jobs, <cite>Apple Worldwide Developers’ Conference, 1997</cite>
					</footer>
				</blockquote>
				<p><code>details</code> and <code>summary</code>:</p>
				<details>
					<summary>
						Copying... <progress max="375505392" value="97543282"></progress> 25%
					</summary>
					<dl>
						<dt>Transfer rate:</dt>
						<dd>452KB/s</dd>
						<dt>Duration:</dt>
						<dd>01:16:27</dd>
						<dt>Color profile:</dt>
						<dd>SD (6-1-6)</dd>
						<dt>Dimensions:</dt>
						<dd>320×240</dd>
					</dl>
				</details>
				<p><code>dl</code>:</p>
				<dl>
					<dt>Definition List Title</dt>
					<dd>Definition list division.</dd>
					<dt>Kitchen Sink</dt>
					<dd>
						Used in expressions to describe work in which all conceivable (and some
						inconceivable) sources have been mined. In this case, a bunch of markup.
					</dd>
					<dt>aside</dt>
					<dd>Defines content aside from the page content</dd>
					<dt>blockquote</dt>
					<dd>Defines a section that is quoted from another source</dd>
				</dl>
				<p><code>figure</code>:</p>
				<figure>
					<img src="https://www.fillmurray.com/402/295" />
					<figcaption>
						Figure 1: A picture of Bill Murray from
						<a href="https://www.fillmurray.com/">fillmurray.com</a>
					</figcaption>
				</figure>
				<br /><br />
				<h4 id="forms"><a href="#forms">#</a> Forms</h4>
				<hr />
				<form>
					<p>
						<label for="example-input-email">Email address</label>
						<input type="email" id="example-input-email" />
					</p>
					<p>
						<label for="example-input-number">Number</label>
						<input type="number" id="example-input-number" />
					</p>
					<p>
						<label for="example-input-password">Password</label>
						<input type="password" id="example-input-password" />
					</p>
					<p>
						<label for="example-input-search">Search</label>
						<input type="search" id="example-input-search" />
					</p>
					<p>
						<label for="example-input-tel">Telephone number</label>
						<input type="tel" id="example-input-tel" />
					</p>
					<p>
						<label for="example-input-text">Text</label>
						<input type="text" id="example-input-text" />
					</p>
					<p>
						<label for="example-input-readonly">Read-only</label>
						<input type="text" readonly value="Can't touch this!" />
					</p>
					<p>
						<label for="example-input-disabled">Disabled</label>
						<input type="text" disabled value="Not available" />
					</p>
					<p>
						<label for="example-input-url">URL</label>
						<input type="url" id="example-input-url" />
					</p>
					<p>
						<label for="example-input-color">Color</label>
						<input type="color" id="example-input-color" />
					</p>
					<p>
						<label for="example-input-date">Date</label>
						<input type="date" id="example-input-date" />
					</p>
					<p>
						<label for="example-input-date-time">Date / Time</label>
						<input type="datetime" id="example-input-date-time" />
					</p>
					<p>
						<label for="example-input-date-time-local">Date / Time local</label>
						<input type="datetime-local" id="example-input-date-time-local" />
					</p>
					<p>
						<label for="example-input-month">Month</label>
						<input type="month" id="example-input-month" />
					</p>
					<p>
						<label for="example-input-week">Week</label>
						<input type="week" id="example-input-week" />
					</p>
					<p>
						<label for="example-input-time">Time</label>
						<input type="time" id="example-input-time" />
					</p>
					<p>
						<label for="example-input-file">File input</label>
						<input type="file" id="example-input-file" />
					</p>
					<p>
						<label for="example-input-range">Range input</label>
						<input type="range" id="example-input-range" min="1" max="4" value="3" />
					</p>
					<p>
						<label for="example-select1">Select</label>
						<select id="example-select1">
							<option>1</option>
							<option>2</option>
							<option>3</option>
							<option>4</option>
							<option>5</option>
						</select>
					</p>
					<p>
						<label for="example-select1a">Select with size</label>
						<select id="example-select1a" size="2">
							<option>1</option>
							<option>2</option>
							<option>3</option>
							<option>4</option>
							<option>5</option>
						</select>
					</p>
					<p>
						<label for="example-select2">Multiple select</label>
						<select multiple id="example-select2">
							<option>1</option>
							<option>2</option>
							<option>3</option>
							<option>4</option>
							<option>5</option>
						</select>
					</p>
					<p>
						<label for="example-optgroup">Select with optgroup: Favorite Car</label>
						<select id="example-optgroup">
							<optgroup label="Swedish Cars">
								<option>Volvo</option>
								<option>Saab</option>
							</optgroup>
							<optgroup label="German Cars">
								<option>Mercedes</option>
								<option>Audi</option>
							</optgroup>
						</select>
					</p>
					<p>
						<label for="example-optgroup2">Select with optgroup and size:Favorite Dish</label>
						<select id="example-optgroup2" size="2">
							<optgroup label="Vegetarian">
								<option>Green Salad</option>
								<option>French Fries</option>
							</optgroup>
							<optgroup label="Carnivorous">
								<option>Big Mac</option>
								<option>Roast Beef</option>
							</optgroup>
						</select>
					</p>
					<p>
						<label for="example-optgroup3">Multiple select with optgroup: Public transport</label>
						<select id="example-optgroup3" multiple>
							<optgroup label="Ground">
								<option>Train</option>
								<option>Bus</option>
							</optgroup>
							<optgroup label="Water">
								<option>Ship</option>
								<option>Submarine</option>
							</optgroup>
							<optgroup label="Air">
								<option>Plane</option>
								<option>Balloon</option>
							</optgroup>
						</select>
					</p>
					<p>
						<label for="example-textarea">Textarea</label>
						<textarea id="example-textarea" rows="3"></textarea>
					</p>
					<fieldset>
						<legend>I am legend</legend>
						<div>
							<input type="radio" name="option-radio" id="option-radio1" value="option1" checked />
							<label for="option-radio1">Option one is this and that&mdash;be sure to include why it's
								great</label>
						</div>
						<div>
							<input type="radio" name="option-radio" id="option-radio2" value="option2" />
							<label>Option two can be something else and selecting it will deselect
								option one</label>
						</div>
						<div>
							<input type="radio" name="option-radio" id="option-radio3" value="option3" disabled />
							<label>Option three is disabled</label>
						</div>
					</fieldset>
					<fieldset>
						<legend>I am also legend</legend>
						<input type="checkbox" id="checkbox1" />
						<label for="checkbox1">Check me out</label>
						<input type="checkbox" id="checkbox2" />
						<label for="checkbox2">and/or check me out</label>
					</fieldset>
					<p>
						<button type="button" name="button">Button</button>
						<input type="button" name="input" value="Input Button" />
						<input type="submit" name="submit" value="Input Submit" />
						<button type="submit" name="submit2">Submit</button>
						<input type="reset" name="reset" value="Input Reset" />
						<button type="reset" name="reset2">Reset</button>
						<button disabled>Cancel</button>
					</p>
				</form>
				<p><code>ul</code> and <code>ol</code>:</p>
				<ul>
					<li>
						Unordered List item one
						<ul>
							<li>
								Nested list item
								<ul>
									<li>Level 3, item one</li>
									<li>Level 3, item two</li>
									<li>Level 3, item three</li>
									<li>Level 3, item four</li>
								</ul>
							</li>
							<li>List item two</li>
							<li>List item three</li>
							<li>List item four</li>
						</ul>
					</li>
					<li>List item two</li>
					<li>List item three</li>
					<li>List item four</li>
				</ul>
				<ol>
					<li>
						List item one
						<ol>
							<li>
								List item one
								<ol>
									<li>List item one</li>
									<li>List item two</li>
									<li>List item three</li>
									<li>List item four</li>
								</ol>
							</li>
							<li>List item two</li>
							<li>List item three</li>
							<li>List item four</li>
						</ol>
					</li>
					<li>List item two</li>
					<li>List item three</li>
					<li>List item four</li>
				</ol>
				<p><code>output</code>:</p>
				<form onsubmit="return false" oninput="o.value= a.valueAsNumber + b.valueAsNumber">
					<input name="a" type="number" step="any" /> +
					<input name="b" type="number" step="any" /> =
					<output name="o" for="a b"></output>
				</form>
				<p><code>pre</code>:</p>
				<pre>
		pre {
		display: block;
		padding: 7px;
		background-color: #F5F5F5;
		border: 1px solid #E1E1E8;
		border-radius: 3px;
		white-space: pre-wrap;
		word-break: break-all;
		font-family: Menlo, Monaco;
		line-height: 160%;
		}</pre>
				<pre><samp>You are in an open field west of a big white house with a boarded
		front door.
		There is a small mailbox here.

		></samp> <kbd>open mailbox</kbd>

		<samp>Opening the mailbox reveals:
		A leaflet.

		></samp></pre>
				<br /><br />
				<h4 id="tables"><a href="#tables">#</a> Tables</h4>
				<hr />
				<table>
					<caption>
						Tables can have captions now.
					</caption>
					<tbody>
						<tr>
							<th>Person</th>
							<th>Number</th>
							<th>Third Column</th>
						</tr>
						<tr>
							<td>Someone Lastname</td>
							<td>900</td>
							<td>Nullam quis risus eget urna mollis ornare vel eu leo.</td>
						</tr>
						<tr>
							<td><a href="#">Person Name</a></td>
							<td>1200</td>
							<td>
								Vestibulum id ligula porta felis euismod semper. Donec ullamcorper
								nulla non metus auctor fringilla.
							</td>
						</tr>
						<tr>
							<td>Another Person</td>
							<td>1500</td>
							<td>
								Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor
								auctor. Nullam id dolor id nibh ultricies vehicula ut id elit.
							</td>
						</tr>
						<tr>
							<td>Last One</td>
							<td>2800</td>
							<td>
								Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Cras
								mattis consectetur purus sit amet fermentum.
							</td>
						</tr>
					</tbody>
				</table>
				<p id="table-summary">
					In the following table, characteristics are given in the second column,
					with the negative side in the left column and the positive side in the
					right column.
				</p>
				<table aria-describedby="table-summary">
					<caption>
						Characteristics with positive and negative sides
					</caption>
					<thead>
						<tr>
							<th id="n">Negative</th>
							<th>Characteristic</th>
							<th id="p">Positive</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td headers="n r1">Sad</td>
							<th id="r1">Mood</th>
							<td headers="p r1">Happy</td>
						</tr>
						<tr>
							<td headers="n r2">Failing</td>
							<th id="r2">Grade</th>
							<td headers="p r2">Passing</td>
						</tr>
					</tbody>
				</table>
				<table>
					<caption>
						Complex table with a
						<code>thead</code>, multiple
						<code>tbody</code>
						elements, and a
						<code>tfoot</code>.
					</caption>
					<thead>
						<tr>
							<th></th>
							<th>2008</th>
							<th>2007</th>
							<th>2006</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<th>Net sales</th>
							<td>$32,479</td>
							<td>$24,006</td>
							<td>$19,315</td>
						</tr>
						<tr>
							<th>Cost of sales</th>
							<td>21,334</td>
							<td>15,852</td>
							<td>13,717</td>
						</tr>
					</tbody>
					<tbody>
						<tr>
							<th>Gross margin</th>
							<td>$11,145</td>
							<td>$8,154</td>
							<td>$5,598</td>
						</tr>
					</tbody>
					<tfoot>
						<tr>
							<th>Gross margin percentage</th>
							<td>34.3%</td>
							<td>34.0%</td>
							<td>29.0%</td>
						</tr>
					</tfoot>
				</table>
				<footer>
					<p>
						See the
						<a target="_blank" href="https://www.w3.org/TR/html5/dom.html#palpable-content">Palpable Content
							spec.</a>
					</p>
				</footer>
			</section>
			<hr />
			<section id="embeds" class="my-6">
				<header>
					<h3 class="mb-2"><a href="#embeds">#</a> Embeds</h3>
					<p>
						Elements <code>audio</code>, <code>canvas</code>, <code>embed</code>,
						<code>iframe</code>, <code>img</code>, <code>math</code>,
						<code>object</code>, <code>picture</code>, <code>svg</code>,
						<code>video</code> make up the <em>embedded content</em> category.
					</p>
				</header>
				<p>
					<code>audio</code>:
					<audio controls src="https://upload.wikimedia.org/wikipedia/commons/c/c7/What_hath_God_wrought.ogg"></audio>
					By Cqdx [<a href="https://creativecommons.org/licenses/by-sa/3.0">CC BY-SA 3.0 </a>],
					<a href="https://commons.wikimedia.org/wiki/File:What_hath_God_wrought.ogg">from Wikimedia Commons</a>.
				</p>
				<p>
					<code>iframe</code>:
					<iframe sandbox srcdoc="<h1>Sample Document</h1><p>This
		is a sample content.</p>"></iframe>
				</p>
				<p>
					<code>img</code>:
					<img src="https://www.fillmurray.com/150/150" alt="Bill Murray" />
				</p>
				<p><code>math</code>:</p>
				<math xmlns="http://www.w3.org/1998/Math/MathML">
					<mtable>
						<mtr>
							<mtd>
								<mtext>Quadratic Equation</mtext>
							</mtd>
							<mtd>
								<mrow>
									<mi>x</mi>
									<mo>=</mo>
									<mfrac>
										<mrow>
											<mo>-</mo>
											<mi>b</mi>
											<mo>&#x00B1;</mo>
											<msqrt>
												<mrow>
													<msubsup>
														<mi>b</mi>
														<mrow></mrow>
														<mn>2</mn>
													</msubsup>
													<mo>-</mo>
													<mn>4</mn>
													<mi>a</mi>
													<mi>c</mi>
												</mrow>
											</msqrt>
										</mrow>
										<mrow>
											<mn>2</mn>
											<mi>a</mi>
										</mrow>
									</mfrac>
								</mrow>
							</mtd>
						</mtr>
					</mtable>
				</math>
				<p>
					<code>picture</code>:
					<picture>
						<source srcset="
					https://www.fillmurray.com/240/300 2x,
					https://www.fillmurray.com/120/150 1x
				" />
						<img src="https://www.fillmurray.com/120/150" alt="Bill Murray" />
					</picture>
				</p>
				<p>
					<code>svg</code>:
					<svg role="presentation" width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
						<path d="M19.199 24C19.199 13.467
		10.533 4.8 0 4.8V0c13.165 0 24 10.835 24 24h-4.801zM3.291
		17.415c1.814 0 3.293 1.479 3.293 3.295 0 1.813-1.485 3.29-3.301
		3.29C1.47 24 0 22.526 0 20.71s1.475-3.294 3.291-3.295zM15.909
		24h-4.665c0-6.169-5.075-11.245-11.244-11.245V8.09c8.727 0 15.909
		7.184 15.909 15.91z" />
					</svg>
				</p>
				<p>
					<code>video</code>:
					<video controls
						src="https://upload.wikimedia.org/wikipedia/commons/b/b8/Dwarf_hamsters_running_on_disc_2.ogv"></video>
				</p>
				<footer>
					<p>
						See the
						<a target="_blank" href="https://www.w3.org/TR/html5/dom.html#embedded-content">Embedded Content
							spec.</a>
					</p>
				</footer>
			</section>
			<hr />
		</main>
		<footer role="contentinfo">
			<p>
				Find this document on
				<a href="https://github.com/dbox/html5-kitchen-sink">GitHub</a>.
			</p>
		</footer>
	</div>
	`,
});

export const ProseDemo = (args, { argTypes }) => ({
	props: Object.keys(argTypes),
	template: `
	<div class="container max-w-2xl">
		<div class="prose">
			<h1>Typography</h1>
			<p class="text-subhead">Until now, trying to style an article, document, or blog post with Tailwind has been a tedious task that required a keen eye for typography and a lot of complex custom CSS.</p>
			<p>By default, Tailwind removes all of the default browser styling from paragraphs, headings, lists and more. This ends up being really useful for building application UIs because you spend less time undoing user-agent styles, but when you <em>really are</em> just trying to style some content that came from a rich-text editor in a CMS or a markdown file, it can be surprising and unintuitive.</p>
			<p>We get lots of complaints about it actually, with people regularly asking us things like:</p>
			<blockquote>
				<p>Why is Tailwind removing the default styles on my <code>h1</code> elements? How do I disable this? What do you mean I lose all the other base styles too?</p>
			</blockquote>
			<p>We hear you, but we're not convinced that simply disabling our base styles is what you really want. You don't want to have to remove annoying margins every time you use a <code>p</code> element in a piece of your dashboard UI. And I doubt you really want your blog posts to use the user-agent styles either — you want them to look <em>awesome</em>, not awful.</p>
			<p>The <code>@tailwindcss/typography</code> plugin is our attempt to give you what you <em>actually</em> want, without any of the downsides of doing something stupid like disabling our base styles.</p>
			<p>It adds a new <code>prose</code> class that you can slap on any block of vanilla HTML content and turn it into a beautiful, well-formatted document:</p>
			<pre><code class="language-html">&lt;article class="prose"&gt;
		&lt;h1&gt;Garlic bread with cheese: What the science tells us&lt;/h1&gt;
		&lt;p&gt;
			For years parents have espoused the health benefits of eating garlic bread with cheese to their
			children, with the food earning such an iconic status in our culture that kids will often dress
			up as warm, cheesy loaf for Halloween.
		&lt;/p&gt;
		&lt;p&gt;
			But a recent study shows that the celebrated appetizer may be linked to a series of rabies cases
			springing up around the country.
		&lt;/p&gt;
		&lt;!-- ... --&gt;
		&lt;/article&gt;
		</code></pre>
			<p>For more information about how to use the plugin and the features it includes, <a href="https://github.com/tailwindcss/typography/blob/master/README.md">read the documentation</a>.</p>
			<hr>
			<h2>What to expect from here on out</h2>
			<p>What follows from here is just a bunch of absolute nonsense I've written to dogfood the plugin itself. It includes every sensible typographic element I could think of, like <strong>bold text</strong>, unordered lists, ordered lists, code blocks, block quotes, <em>and even italics</em>.</p>
			<p>It's important to cover all of these use cases for a few reasons:</p>
			<ol>
				<li>We want everything to look good out of the box.</li>
				<li>Really just the first reason, that's the whole point of the plugin.</li>
				<li>Here's a third pretend reason though a list with three items looks more realistic than a list with two items.</li>
			</ol>
			<p>Now we're going to try out another header style.</p>
			<h3>Typography should be easy</h3>
			<p>So that's a header for you — with any luck if we've done our job correctly that will look pretty reasonable.</p>
			<p>Something a wise person once told me about typography is:</p>
			<blockquote>
				<p>Typography is pretty important if you don't want your stuff to look like trash. Make it good then it won't be bad.</p>
			</blockquote>
			<p>It's probably important that images look okay here by default as well:</p>
			<figure>
				<img src="https://images.unsplash.com/photo-1556740758-90de374c12ad?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=1000&amp;q=80" alt="">
				<figcaption>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.</figcaption>
			</figure>
			<p>Now I'm going to show you an example of an unordered list to make sure that looks good, too:</p>
			<ul>
				<li>So here is the first item in this list.</li>
				<li>In this example we're keeping the items short.</li>
				<li>Later, we'll use longer, more complex list items.</li>
			</ul>
			<p>And that's the end of this section.</p>
			<h2>What if we stack headings?</h2>
			<h3>We should make sure that looks good, too.</h3>
			<p>Sometimes you have headings directly underneath each other. In those cases you often have to undo the top margin on the second heading because it usually looks better for the headings to be closer together than a paragraph followed by a heading should be.</p>
			<h3>When a heading comes after a paragraph …</h3>
			<p>When a heading comes after a paragraph, we need a bit more space, like I already mentioned above. Now let's see what a more complex list would look like.</p>
			<ul>
				<li>
					<p><strong>I often do this thing where list items have headings.</strong></p>
					<p>For some reason I think this looks cool which is unfortunate because it's pretty annoying to get the styles right.</p>
					<p>I often have two or three paragraphs in these list items, too, so the hard part is getting the spacing between the paragraphs, list item heading, and separate list items to all make sense. Pretty tough honestly, you could make a strong argument that you just shouldn't write this way.</p>
				</li>
				<li>
					<p><strong>Since this is a list, I need at least two items.</strong></p>
					<p>I explained what I'm doing already in the previous list item, but a list wouldn't be a list if it only had one item, and we really want this to look realistic. That's why I've added this second list item so I actually have something to look at when writing the styles.</p>
				</li>
				<li>
					<p><strong>It's not a bad idea to add a third item either.</strong></p>
					<p>I think it probably would've been fine to just use two items but three is definitely not worse, and since I seem to be having no trouble making up arbitrary things to type, I might as well include it.</p>
				</li>
			</ul>
			<p>After this sort of list I usually have a closing statement or paragraph, because it kinda looks weird jumping right to a heading.</p>
			<h2>Code should look okay by default.</h2>
			<p>I think most people are going to use <a href="https://highlightjs.org/">highlight.js</a> or <a href="https://prismjs.com/">Prism</a> or something if they want to style their code blocks but it wouldn't hurt to make them look <em>okay</em> out of the box, even with no syntax highlighting.</p>
			<p>Here's what a default <code>tailwind.config.js</code> file looks like at the time of writing:</p>
			<pre><code class="language-js">module.exports = {
		purge: [],
		theme: {
			extend: {},
		},
		variants: {},
		plugins: [],
		}
		</code></pre>
			<p>Hopefully that looks good enough to you.</p>
			<h3>What about nested lists?</h3>
			<p>Nested lists basically always look bad which is why editors like Medium don't even let you do it, but I guess since some of you goofballs are going to do it we have to carry the burden of at least making it work.</p>
			<ol>
				<li>
					<strong>Nested lists are rarely a good idea.</strong>
					<ul>
						<li>You might feel like you are being really "organized" or something but you are just creating a gross shape on the screen that is hard to read.</li>
						<li>Nested navigation in UIs is a bad idea too, keep things as flat as possible.</li>
						<li>Nesting tons of folders in your source code is also not helpful.</li>
					</ul>
				</li>
				<li>
					<strong>Since we need to have more items, here's another one.</strong>
					<ul>
						<li>I'm not sure if we'll bother styling more than two levels deep.</li>
						<li>Two is already too much, three is guaranteed to be a bad idea.</li>
						<li>If you nest four levels deep you belong in prison.</li>
					</ul>
				</li>
				<li>
					<strong>Two items isn't really a list, three is good though.</strong>
					<ul>
						<li>Again please don't nest lists if you want people to actually read your content.</li>
						<li>Nobody wants to look at this.</li>
						<li>I'm upset that we even have to bother styling this.</li>
					</ul>
				</li>
			</ol>
			<p>The most annoying thing about lists in Markdown is that <code>&lt;li&gt;</code> elements aren't given a child <code>&lt;p&gt;</code> tag unless there are multiple paragraphs in the list item. That means I have to worry about styling that annoying situation too.</p>
			<ul>
				<li>
					<p><strong>For example, here's another nested list.</strong></p>
					<p>But this time with a second paragraph.</p>
					<ul>
						<li>These list items won't have <code>&lt;p&gt;</code> tags</li>
						<li>Because they are only one line each</li>
					</ul>
				</li>
				<li>
					<p><strong>But in this second top-level list item, they will.</strong></p>
					<p>This is especially annoying because of the spacing on this paragraph.</p>
					<ul>
						<li>
							<p>As you can see here, because I've added a second line, this list item now has a <code>&lt;p&gt;</code> tag.</p>
							<p>This is the second line I'm talking about by the way.</p>
						</li>
						<li>
							<p>Finally here's another list item so it's more like a list.</p>
						</li>
					</ul>
				</li>
				<li>
					<p>A closing list item, but with no nested list, because why not?</p>
				</li>
			</ul>
			<p>And finally a sentence to close off this section.</p>
			<h2>There are other elements we need to style</h2>
			<p>I almost forgot to mention links, like <a href="https://tailwindcss.com">this link to the Tailwind CSS website</a>. We almost made them blue but that's so yesterday, so we went with dark gray, feels edgier.</p>
			<!--
			<p>We even included table styles, check it out:</p>
			<table>
				<thead>
					<tr>
						<th>Wrestler</th>
						<th>Origin</th>
						<th>Finisher</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>Bret "The Hitman" Hart</td>
						<td>Calgary, AB</td>
						<td>Sharpshooter</td>
					</tr>
					<tr>
						<td>Stone Cold Steve Austin</td>
						<td>Austin, TX</td>
						<td>Stone Cold Stunner</td>
					</tr>
					<tr>
						<td>Randy Savage</td>
						<td>Sarasota, FL</td>
						<td>Elbow Drop</td>
					</tr>
					<tr>
						<td>Vader</td>
						<td>Boulder, CO</td>
						<td>Vader Bomb</td>
					</tr>
					<tr>
						<td>Razor Ramon</td>
						<td>Chuluota, FL</td>
						<td>Razor's Edge</td>
					</tr>
				</tbody>
			</table>
			-->
			<p>We also need to make sure inline code looks good, like if I wanted to talk about <code>&lt;span&gt;</code> elements or tell you the good news about <code>@tailwindcss/typography</code>.</p>
			<h3>Sometimes I even use <code>code</code> in headings</h3>
			<p>Even though it's probably a bad idea, and historically I've had a hard time making it look good. This <em>"wrap the code blocks in backticks"</em> trick works pretty well though really.</p>
			<p>Another thing I've done in the past is put a <code>code</code> tag inside of a link, like if I wanted to tell you about the <a href="https://github.com/tailwindcss/docs"><code>tailwindcss/docs</code></a> repository. I don't love that there is an underline below the backticks but it is absolutely not worth the madness it would require to avoid it.</p>
			<h4>We haven't used an <code>h4</code> yet</h4>
			<p>But now we have. Please don't use <code>h5</code> or <code>h6</code> in your content, Medium only supports two heading levels for a reason, you animals. I honestly considered using a <code>before</code> pseudo-element to scream at you if you use an <code>h5</code> or <code>h6</code>.</p>
			<p>We don't style them at all out of the box because <code>h4</code> elements are already so small that they are the same size as the body copy. What are we supposed to do with an <code>h5</code>, make it <em>smaller</em> than the body copy? No thanks.</p>
			<h3>We still need to think about stacked headings though.</h3>
			<h4>Let's make sure we don't screw that up with <code>h4</code> elements, either.</h4>
			<p>Phew, with any luck we have styled the headings above this text and they look pretty good.</p>
			<p>Let's add a closing paragraph here so things end with a decently sized block of text. I can't explain why I want things to end that way but I have to assume it's because I think things will look weird or unbalanced if there is a heading too close to the end of the document.</p>
			<p>What I've written here is probably long enough, but adding this final sentence can't hurt.</p>
		</div>
	</div>
	`,
});

export const NoProseDemo = (args, { argTypes }) => ({
	props: Object.keys(argTypes),
	template: `
	<div class="container max-w-2xl">
		<h1 class="mb-4">Typography</h1>
		<p class="text-subhead mb-4">Until now, trying to style an article, document, or blog post with Tailwind has been a tedious task that required a keen eye for typography and a lot of complex custom CSS.</p>
		<p class="mb-4">By default, Tailwind removes all of the default browser styling from paragraphs, headings, lists and more. This ends up being really useful for building application UIs because you spend less time undoing user-agent styles, but when you <em>really are</em> just trying to style some content that came from a rich-text editor in a CMS or a markdown file, it can be surprising and unintuitive.</p>
		<p class="mb-4">We get lots of complaints about it actually, with people regularly asking us things like:</p>
		<blockquote class="mb-4 relative pl-6">
			<span class="text-h1 text-gray-300 absolute left-0">“</span>
			<p class="text-subhead italic">Why is Tailwind removing the default styles on my <code>h1</code> elements? How do I disable this? What do you mean I lose all the other base styles too?</p>
		</blockquote>
		<p class="mb-4">We hear you, but we're not convinced that simply disabling our base styles is what you really want. You don't want to have to remove annoying margins every time you use a <code>p</code> element in a piece of your dashboard UI. And I doubt you really want your blog posts to use the user-agent styles either — you want them to look <em>awesome</em>, not awful.</p>
		<p class="mb-4">The <code>@tailwindcss/typography</code> plugin is our attempt to give you what you <em>actually</em> want, without any of the downsides of doing something stupid like disabling our base styles.</p>
		<p class="mb-4">It adds a new <code>prose</code> class that you can slap on any block of vanilla HTML content and turn it into a beautiful, well-formatted document:</p>
		<pre class="bg-gray-800 my-4 py-2 px-3 rounded-sm text-gray-100 overflow-x-auto"><code class="language-html">&lt;article class="prose"&gt;
	&lt;h1&gt;Garlic bread with cheese: What the science tells us&lt;/h1&gt;
	&lt;p&gt;
		For years parents have espoused the health benefits of eating garlic bread with cheese to their
		children, with the food earning such an iconic status in our culture that kids will often dress
		up as warm, cheesy loaf for Halloween.
	&lt;/p&gt;
	&lt;p&gt;
		But a recent study shows that the celebrated appetizer may be linked to a series of rabies cases
		springing up around the country.
	&lt;/p&gt;
	&lt;!-- ... --&gt;
	&lt;/article&gt;
	</code></pre>
		<p class="mb-4">For more information about how to use the plugin and the features it includes, <a href="https://github.com/tailwindcss/typography/blob/master/README.md">read the documentation</a>.</p>
		<hr class="my-6">
		<h2 class="mb-4">What to expect from here on out</h2>
		<p class="mb-4">What follows from here is just a bunch of absolute nonsense I've written to dogfood the plugin itself. It includes every sensible typographic element I could think of, like <strong>bold text</strong>, unordered lists, ordered lists, code blocks, block quotes, <em>and even italics</em>.</p>
		<p class="mb-4">It's important to cover all of these use cases for a few reasons:</p>
		<ol class="list-decimal list-outside pl-3 mb-4">
			<li class="my-2 pl-0.5">We want everything to look good out of the box.</li>
			<li class="my-2 pl-0.5">Really just the first reason, that's the whole point of the plugin.</li>
			<li class="my-2 pl-0.5">Here's a third pretend reason though a list with three items looks more realistic than a list with two items.</li>
		</ol>
		<p class="mb-4">Now we're going to try out another header style.</p>
		<h3 class="mb-2">Typography should be easy</h3>
		<p class="mb-4">So that's a header for you — with any luck if we've done our job correctly that will look pretty reasonable.</p>
		<p class="mb-4">Something a wise person once told me about typography is:</p>
		<blockquote>
			<p>Typography is pretty important if you don't want your stuff to look like trash. Make it good then it won't be bad.</p>
		</blockquote>
		<p class="mb-4">It's probably important that images look okay here by default as well:</p>
		<figure class="mb-4">
			<img src="https://images.unsplash.com/photo-1556740758-90de374c12ad?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=1000&amp;q=80" alt="">
			<figcaption class="text-small my-2 text-gray-500">Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.</figcaption>
		</figure>
		<p class="mb-4">Now I'm going to show you an example of an unordered list to make sure that looks good, too:</p>
		<ul class="list-disc list-outside pl-3 mb-4">
			<li class="my-2 pl-0.5">So here is the first item in this list.</li>
			<li class="my-2 pl-0.5">In this example we're keeping the items short.</li>
			<li class="my-2 pl-0.5">Later, we'll use longer, more complex list items.</li>
		</ul>
		<p class="mb-4">And that's the end of this section.</p>
		<h2 class="mb-4">What if we stack headings?</h2>
		<h3 class="mb-2">We should make sure that looks good, too.</h3>
		<p class="mb-4">Sometimes you have headings directly underneath each other. In those cases you often have to undo the top margin on the second heading because it usually looks better for the headings to be closer together than a paragraph followed by a heading should be.</p>
		<h3 class="mb-2">When a heading comes after a paragraph …</h3>
		<p class="mb-4">When a heading comes after a paragraph, we need a bit more space, like I already mentioned above. Now let's see what a more complex list would look like.</p>
		<ul class="list-disc list-outside pl-3 mb-4">
			<li class="my-2 pl-0.5"">
				<p class="mb-2"><strong>I often do this thing where list items have headings.</strong></p>
				<p class="mb-2">For some reason I think this looks cool which is unfortunate because it's pretty annoying to get the styles right.</p>
				<p class="mb-2">I often have two or three paragraphs in these list items, too, so the hard part is getting the spacing between the paragraphs, list item heading, and separate list items to all make sense. Pretty tough honestly, you could make a strong argument that you just shouldn't write this way.</p>
			</li>
			<li class="my-2 pl-0.5"">
				<p class="mb-2"><strong>Since this is a list, I need at least two items.</strong></p>
				<p class="mb-2">I explained what I'm doing already in the previous list item, but a list wouldn't be a list if it only had one item, and we really want this to look realistic. That's why I've added this second list item so I actually have something to look at when writing the styles.</p>
			</li>
			<li class="my-2 pl-0.5"">
				<p class="mb-2"><strong>It's not a bad idea to add a third item either.</strong></p>
				<p class="mb-2">I think it probably would've been fine to just use two items but three is definitely not worse, and since I seem to be having no trouble making up arbitrary things to type, I might as well include it.</p>
			</li>
		</ul>
		<p class="mb-4">After this sort of list I usually have a closing statement or paragraph, because it kinda looks weird jumping right to a heading.</p>
		<h2 class="mb-4 mt-8">Code should look okay by default.</h2>
		<p class="mb-4">I think most people are going to use <a href="https://highlightjs.org/">highlight.js</a> or <a href="https://prismjs.com/">Prism</a> or something if they want to style their code blocks but it wouldn't hurt to make them look <em>okay</em> out of the box, even with no syntax highlighting.</p>
		<p class="mb-4">Here's what a default <code>tailwind.config.js</code> file looks like at the time of writing:</p>
		<pre><code class="language-js">module.exports = {
	purge: [],
	theme: {
		extend: {},
	},
	variants: {},
	plugins: [],
	}
	</code></pre>
		<p class="mb-4">Hopefully that looks good enough to you.</p>
		<h3 class="mb-2">What about nested lists?</h3>
		<p class="mb-4">Nested lists basically always look bad which is why editors like Medium don't even let you do it, but I guess since some of you goofballs are going to do it we have to carry the burden of at least making it work.</p>
		<ol class="list-decimal list-outside pl-3 mb-4">
			<li class="my-2 pl-0.5">
				<strong>Nested lists are rarely a good idea.</strong>
				<ul class="list-disc list-outside pl-3 mb-4">
					<li class="my-2 pl-0.5">You might feel like you are being really "organized" or something but you are just creating a gross shape on the screen that is hard to read.</li>
					<li class="my-2 pl-0.5">Nested navigation in UIs is a bad idea too, keep things as flat as possible.</li>
					<li class="my-2 pl-0.5">Nesting tons of folders in your source code is also not helpful.</li>
				</ul>
			</li>
			<li class="my-2 pl-0.5">
				<strong>Since we need to have more items, here's another one.</strong>
				<ul class="list-disc list-outside pl-3 mb-4">
					<li class="my-2 pl-0.5">I'm not sure if we'll bother styling more than two levels deep.</li>
					<li class="my-2 pl-0.5">Two is already too much, three is guaranteed to be a bad idea.</li>
					<li class="my-2 pl-0.5">If you nest four levels deep you belong in prison.</li>
				</ul>
			</li>
			<li class="my-2 pl-0.5">
				<strong>Two items isn't really a list, three is good though.</strong>
				<ul class="list-disc list-outside pl-3 mb-4">
					<li class="my-2 pl-0.5">Again please don't nest lists if you want people to actually read your content.</li>
					<li class="my-2 pl-0.5">Nobody wants to look at this.</li>
					<li class="my-2 pl-0.5">I'm upset that we even have to bother styling this.</li>
				</ul>
			</li>
		</ol>
		<p>The most annoying thing about lists in Markdown is that <code>&lt;li&gt;</code> elements aren't given a child <code>&lt;p&gt;</code> tag unless there are multiple paragraphs in the list item. That means I have to worry about styling that annoying situation too.</p>
		<ul class="list-disc list-outside pl-3 mb-4">
			<li class="my-2 pl-0.5">
				<p class="mb-2"><strong>For example, here's another nested list.</strong></p>
				<p class="mb-2">But this time with a second paragraph.</p>
				<ul class="list-disc list-outside pl-3 mb-4">
					<li class="my-2 pl-0.5">These list items won't have <code>&lt;p&gt;</code> tags</li>
					<li class="my-2 pl-0.5">Because they are only one line each</li>
				</ul>
			</li>
			<li class="my-2 pl-0.5">
				<p class="mb-2"><strong>But in this second top-level list item, they will.</strong></p>
				<p class="mb-2">This is especially annoying because of the spacing on this paragraph.</p>
				<ul class="list-disc list-outside pl-3 mb-4">
					<li class="my-2 pl-0.5">
						<p>As you can see here, because I've added a second line, this list item now has a <code>&lt;p&gt;</code> tag.</p>
						<p>This is the second line I'm talking about by the way.</p>
					</li>
					<li class="my-2 pl-0.5">
						<p>Finally here's another list item so it's more like a list.</p>
					</li>
				</ul>
			</li>
			<li class="my-2 pl-0.5">
				<p class="mb-2">A closing list item, but with no nested list, because why not?</p>
			</li>
		</ul>
		<p class="mb-4">And finally a sentence to close off this section.</p>
		<h2 class="mb-4">There are other elements we need to style</h2>
		<p class="mb-4">I almost forgot to mention links, like <a href="https://tailwindcss.com">this link to the Tailwind CSS website</a>. We almost made them blue but that's so yesterday, so we went with dark gray, feels edgier.</p>
		<!--
		<p class="mb-4">We even included table styles, check it out:</p>
		<table>
			<thead>
				<tr>
					<th>Wrestler</th>
					<th>Origin</th>
					<th>Finisher</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td>Bret "The Hitman" Hart</td>
					<td>Calgary, AB</td>
					<td>Sharpshooter</td>
				</tr>
				<tr>
					<td>Stone Cold Steve Austin</td>
					<td>Austin, TX</td>
					<td>Stone Cold Stunner</td>
				</tr>
				<tr>
					<td>Randy Savage</td>
					<td>Sarasota, FL</td>
					<td>Elbow Drop</td>
				</tr>
				<tr>
					<td>Vader</td>
					<td>Boulder, CO</td>
					<td>Vader Bomb</td>
				</tr>
				<tr>
					<td>Razor Ramon</td>
					<td>Chuluota, FL</td>
					<td>Razor's Edge</td>
				</tr>
			</tbody>
		</table>
		-->
		<p class="mb-4">We also need to make sure inline code looks good, like if I wanted to talk about <code>&lt;span&gt;</code> elements or tell you the good news about <code>@tailwindcss/typography</code>.</p>
		<h3 class="mb-2">Sometimes I even use <code>code</code> in headings</h3>
		<p class="mb-4">Even though it's probably a bad idea, and historically I've had a hard time making it look good. This <em>"wrap the code blocks in backticks"</em> trick works pretty well though really.</p>
		<p class="mb-4">Another thing I've done in the past is put a <code>code</code> tag inside of a link, like if I wanted to tell you about the <a href="https://github.com/tailwindcss/docs"><code>tailwindcss/docs</code></a> repository. I don't love that there is an underline below the backticks but it is absolutely not worth the madness it would require to avoid it.</p>
		<h4 class="mb-2">We haven't used an <code>h4</code> yet</h4>
		<p class="mb-4">But now we have. Please don't use <code>h5</code> or <code>h6</code> in your content, Medium only supports two heading levels for a reason, you animals. I honestly considered using a <code>before</code> pseudo-element to scream at you if you use an <code>h5</code> or <code>h6</code>.</p>
		<p class="mb-4">We don't style them at all out of the box because <code>h4</code> elements are already so small that they are the same size as the body copy. What are we supposed to do with an <code>h5</code>, make it <em>smaller</em> than the body copy? No thanks.</p>
		<h3 class="mb-2">We still need to think about stacked headings though.</h3>
		<h4 class="mb-2">Let's make sure we don't screw that up with <code>h4</code> elements, either.</h4>
		<p class="mb-4">Phew, with any luck we have styled the headings above this text and they look pretty good.</p>
		<p class="mb-4">Let's add a closing paragraph here so things end with a decently sized block of text. I can't explain why I want things to end that way but I have to assume it's because I think things will look weird or unbalanced if there is a heading too close to the end of the document.</p>
		<p class="mb-4">What I've written here is probably long enough, but adding this final sentence can't hurt.</p>
	</div>
	`,
});
