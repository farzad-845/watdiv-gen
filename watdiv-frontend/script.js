let namespaceCount = 1;
let propertyGroupCount = 1;
let entityCount = 1;
let propertyDeclarationCount = 0;

function addNamespace() {
    const namespaceInputs = document.getElementById('namespaceInputs');

    const div = document.createElement('div');
    div.innerHTML = `
        <label for="nsIdentifier${namespaceCount}">Namespace Identifier (NSIdentifier):</label>
        <input type="text" id="nsIdentifier${namespaceCount}" required>
        
        <label for="nsPrefix${namespaceCount}">Prefix (NSPrefix):</label>
        <input type="text" id="nsPrefix${namespaceCount}" required>
    `;

    namespaceInputs.appendChild(div);
    namespaceCount++;
}


function addEntity() {
    const entitiesDiv = document.getElementById('entities');

    const div = document.createElement('div');
    div.innerHTML = `
        <h2>Entity ${entityCount}</h2>
        <label for="entityType${entityCount}">Entity Type:</label>
        <select id="entityType${entityCount}" onchange="toggleEntityDeclaration(${entityCount})">
            <option value="scalable">Scalable Entity</option>
            <option value="nonScalable">Non-Scalable Entity</option>
        </select>

        <label for="entityName${entityCount}">Entity Name:</label>
        <input type="text" id="entityName${entityCount}" required>
        
        <label for="entityCount${entityCount}">Entity Count:</label>
        <input type="number" id="entityCount${entityCount}" required>

        <button type="button" id="addPropertyGroup${entityCount}" onclick="addPropertyGroup(${entityCount})">Add Property Group</button>
        
        <div id="propertyGroups${entityCount}"></div>
    `;

    entitiesDiv.appendChild(div);
    entityCount++;
}

function addPropertyGroup(entityIndex) {
    const propertyGroupsDiv = document.getElementById(`propertyGroups${entityIndex}`);

    const div = document.createElement('div');
    const propertyGroupIndex = propertyGroupsDiv.childElementCount + 1;
    div.innerHTML = `
        <hr>
        <label for="instantiationProbability${entityIndex}_${propertyGroupIndex}">Instantiation Probability:</label>
        <input type="text" id="instantiationProbability${entityIndex}_${propertyGroupIndex}" placeholder="e.g., 0.2">

        <label for="typeAssertion${entityIndex}_${propertyGroupIndex}">Type Assertion (optional):</label>
        <input type="text" id="typeAssertion${entityIndex}_${propertyGroupIndex}" placeholder="EntityName">

        <button type="button" onclick="addLiteralProperty(${entityIndex}, ${propertyGroupIndex})">Add Literal Property</button>
        <div id="literalProperties${entityIndex}_${propertyGroupIndex}"></div>
    `;

    propertyGroupsDiv.appendChild(div);
}

function addLiteralProperty(entityIndex, propertyGroupIndex) {
    const literalPropertiesDiv = document.getElementById(`literalProperties${entityIndex}_${propertyGroupIndex}`);
    const literalPropertyIndex = literalPropertiesDiv.childElementCount + 1;

    const div = document.createElement('div');
    div.id = `literalProperty${entityIndex}_${propertyGroupIndex}_${literalPropertyIndex}`;

    div.innerHTML = `
        <label for="propertyName${entityIndex}_${propertyGroupIndex}_${literalPropertyIndex}">Property Name:</label>
        <input type="text" id="propertyName${entityIndex}_${propertyGroupIndex}_${literalPropertyIndex}" required>

        <label for="literalType${entityIndex}_${propertyGroupIndex}_${literalPropertyIndex}">Literal Type:</label>
        <select id="literalType${entityIndex}_${propertyGroupIndex}_${literalPropertyIndex}">
            <option value="INTEGER">INTEGER</option>
            <option value="STRING">STRING</option>
            <option value="DATE">DATE</option>
            <option value="NAME">NAME</option>
        </select>

        <label for="minRange${entityIndex}_${propertyGroupIndex}_${literalPropertyIndex}">Min Range (optional):</label>
        <input type="text" id="minRange${entityIndex}_${propertyGroupIndex}_${literalPropertyIndex}" placeholder="Min Value">

        <label for="maxRange${entityIndex}_${propertyGroupIndex}_${literalPropertyIndex}">Max Range (optional):</label>
        <input type="text" id="maxRange${entityIndex}_${propertyGroupIndex}_${literalPropertyIndex}" placeholder="Max Value">

        <label for="distributionType${entityIndex}_${propertyGroupIndex}_${literalPropertyIndex}">Distribution Type (optional):</label>
        <select id="distributionType${entityIndex}_${propertyGroupIndex}_${literalPropertyIndex}">
            <option value="UNIFORM">UNIFORM</option>
            <option value="NORMAL">NORMAL</option>
            <option value="ZIPFIAN">ZIPFIAN</option>
        </select>
    `;

    literalPropertiesDiv.appendChild(div);
}

function toggleEntityDeclaration() {
    const entityType = document.getElementById('entityType').value;
    const addPropertyGroupBtn = document.getElementById('addPropertyGroup');
    const propertyGroupsDiv = document.getElementById('propertyGroups');

    if (entityType === 'nonScalable') {
        addPropertyGroupBtn.style.display = 'block';
        propertyGroupsDiv.style.display = 'block';
    } else {
        addPropertyGroupBtn.style.display = 'none';
        propertyGroupsDiv.style.display = 'none';
        propertyGroupsDiv.innerHTML = ''; // Clear property groups for scalable entity
        propertyGroupCount = 1;
    }
}

function addPropertyDeclaration() {
    propertyDeclarationCount++;

    const propertyDeclarationsDiv = document.getElementById('propertyDeclarations');

    const propertyDeclarationDiv = document.createElement('div');
    propertyDeclarationDiv.id = `propertyDeclaration${propertyDeclarationCount}`;

    propertyDeclarationDiv.innerHTML = `
        <hr>
        <label for="entityType${propertyDeclarationCount}">Subject Entity:</label>
        <input type="text" id="entityType${propertyDeclarationCount}" placeholder="watdiv:Product">

        <label for="propertyName${propertyDeclarationCount}">Predicate:</label>
        <input type="text" id="propertyName${propertyDeclarationCount}" placeholder="watdiv:availableAt">

        <label for="objectType${propertyDeclarationCount}">Object Entity:</label>
        <input type="text" id="objectType${propertyDeclarationCount}" placeholder="watdiv:Retailer">

        <label for="subjectCardinality${propertyDeclarationCount}">Subject Cardinality:</label>
        <input type="number" id="subjectCardinality${propertyDeclarationCount}" placeholder="1" min="1" max="2">

        <label for="objectCardinality${propertyDeclarationCount}">Object Cardinality:</label>
        <input type="number" id="objectCardinality${propertyDeclarationCount}" placeholder="1" min="1">

        <label for="objectCardinalityDistribution${propertyDeclarationCount}">Object Cardinality Distribution:</label>
        <select id="objectCardinalityDistribution${propertyDeclarationCount}">
            <option value="">None</option>
            <option value="UNIFORM">UNIFORM</option>
            <option value="NORMAL">NORMAL</option>
        </select>

        <label for="instantiationProbability${propertyDeclarationCount}">Instantiation Probability:</label>
        <input type="text" id="instantiationProbability${propertyDeclarationCount}" placeholder="0.1">

        <label for="distributionType${propertyDeclarationCount}">Distribution Type:</label>
        <input type="text" id="distributionType${propertyDeclarationCount}" placeholder="uniform">

        <label for="subjectTypeAssertion${propertyDeclarationCount}">Subject Type Assertion:</label>
        <input type="text" id="subjectTypeAssertion${propertyDeclarationCount}" placeholder="watdiv:Product">

        <label for="objectTypeAssertion${propertyDeclarationCount}">Object Type Assertion:</label>
        <input type="text" id="objectTypeAssertion${propertyDeclarationCount}" placeholder="watdiv:Retailer">

        <button onclick="removePropertyDeclaration(${propertyDeclarationCount})">Remove</button>
    `;

    propertyDeclarationsDiv.appendChild(propertyDeclarationDiv);
}

function removePropertyDeclaration(id) {
    const propertyDeclarationDiv = document.getElementById(`propertyDeclaration${id}`);
    propertyDeclarationDiv.remove();
}

function generateDeclaration() {
    let declaration = '';

    for (let i = 1; i < namespaceCount; i++) {
        console.log(`nsIdentifier${i}`)
        const nsIdentifier = document.getElementById(`nsIdentifier${i}`).value;
        const nsPrefix = document.getElementById(`nsPrefix${i}`).value;

        if (nsIdentifier && nsPrefix) {
            declaration += `#namespace ${nsIdentifier}=${nsPrefix}\n`;
        }
    }

    if (declaration) {
        declaration += '\n';
    }

    for (let i = 1; i < entityCount; i++) {
        const entityType = document.getElementById(`entityType${i}`).value;
        const entityName = document.getElementById(`entityName${i}`).value;
        const entityCountValue = document.getElementById(`entityCount${i}`).value;

        declaration += `<type${entityType === 'nonScalable' ? '*' : ''}>    ${entityName} ${entityCountValue}\n`;

        const propertyGroupsDiv = document.getElementById(`propertyGroups${i}`);
        const propertyGroups = propertyGroupsDiv.querySelectorAll('div');

        propertyGroups.forEach((propertyGroupDiv, propertyGroupIndex) => {
            if (propertyGroupDiv.id !== '') {
                return;
            }

            const instantiationProbability = propertyGroupDiv.querySelector(`#instantiationProbability${i}_${propertyGroupIndex + 1}`).value;
            const typeAssertion = propertyGroupDiv.querySelector(`#typeAssertion${i}_${propertyGroupIndex + 1}`).value;

            declaration += `\t<pgroup>   ${instantiationProbability}`;
            if (typeAssertion) {
                declaration += `   \@${typeAssertion}`;
            }
            declaration += '\n';

            const literalPropertiesDiv = propertyGroupDiv.querySelector(`#literalProperties${i}_${propertyGroupIndex + 1}`);
            const literalProperties = literalPropertiesDiv.querySelectorAll('div');

            literalProperties.forEach((propertyDiv, index) => {
                const propertyName = propertyDiv.querySelector(`#propertyName${i}_${propertyGroupIndex + 1}_${index + 1}`).value;
                const literalType = propertyDiv.querySelector(`#literalType${i}_${propertyGroupIndex + 1}_${index + 1}`).value;
                const minRange = propertyDiv.querySelector(`#minRange${i}_${propertyGroupIndex + 1}_${index + 1}`).value;
                const maxRange = propertyDiv.querySelector(`#maxRange${i}_${propertyGroupIndex + 1}_${index + 1}`).value;
                const distributionType = propertyDiv.querySelector(`#distributionType${i}_${propertyGroupIndex + 1}_${index + 1}`).value;

                declaration += `\t\t#predicate    ${propertyName} ${literalType}`;
                if (minRange && maxRange) {
                    declaration += `    ${minRange} ${maxRange}`;
                }
                if (distributionType) {
                    declaration += `    ${distributionType}`;
                }
                declaration += '\n';
            });

            declaration += '\t</pgroup>\n';
        });


        declaration += '</type>\n';
    }

    if (declaration) {
        declaration += '\n';
    }
    for (let i = 1; i <= propertyDeclarationCount; i++) {
        const entityType = document.getElementById(`entityType${i}`).value;
        const propertyName = document.getElementById(`propertyName${i}`).value;
        const objectType = document.getElementById(`objectType${i}`).value;
        const subjectCardinality = document.getElementById(`subjectCardinality${i}`).value;
        const objectCardinality = document.getElementById(`objectCardinality${i}`).value;
        const objectCardinalityDistribution = document.getElementById(`objectCardinalityDistribution${i}`).value;
        const instantiationProbability = document.getElementById(`instantiationProbability${i}`).value;
        const distributionType = document.getElementById(`distributionType${i}`).value;
        const subjectTypeAssertion = document.getElementById(`subjectTypeAssertion${i}`).value;
        const objectTypeAssertion = document.getElementById(`objectTypeAssertion${i}`).value;

        declaration += `#association ${entityType} ${propertyName} ${objectType} ${subjectCardinality} ${objectCardinality}`;

        if (objectCardinalityDistribution) {
            declaration += `[${objectCardinalityDistribution}]`;
        }

        declaration += ` ${instantiationProbability} ${distributionType}`;

        if (subjectTypeAssertion || objectTypeAssertion) {
            declaration += ` @${subjectTypeAssertion} @${objectTypeAssertion}`;
        }

        declaration += '\n';
    }

    // console.log(declaration)
    document.getElementById('declarationResult').value = declaration;
}

function downloadFile() {
    const declaration = document.getElementById('declarationResult').value;

    if (declaration.trim() === '') {
        alert('Please generate the declaration first.');
        return;
    }

    const blob = new Blob([declaration], { type: 'text/plain' });

    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'namespace_declaration.txt';
    a.style.display = 'none';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}
