<?xml version="1.0" encoding="UTF-8"?><sld:StyledLayerDescriptor xmlns="http://www.opengis.net/sld" xmlns:sld="http://www.opengis.net/sld" xmlns:gml="http://www.opengis.net/gml" xmlns:ogc="http://www.opengis.net/ogc" version="1.0.0">
  <sld:NamedLayer>
    <sld:Name>Default Styler</sld:Name>
    <sld:UserStyle>
      <sld:Name>Default Styler</sld:Name>
      <sld:FeatureTypeStyle>
        <sld:Rule>
          <sld:MinScaleDenominator>50001.0</sld:MinScaleDenominator>
          <sld:MaxScaleDenominator>100001.0</sld:MaxScaleDenominator>
          <sld:LineSymbolizer>
            <sld:Stroke>
              <sld:CssParameter name="stroke">#0000ff</sld:CssParameter>
              <sld:CssParameter name="stroke-linecap">round</sld:CssParameter>
              <sld:CssParameter name="stroke-opacity">0.5</sld:CssParameter>
            </sld:Stroke>
          </sld:LineSymbolizer>
        </sld:Rule>
        <sld:Rule>
          <sld:MinScaleDenominator>10001.0</sld:MinScaleDenominator>
          <sld:MaxScaleDenominator>50001.0</sld:MaxScaleDenominator>
          <sld:LineSymbolizer>
            <sld:Stroke>
              <sld:CssParameter name="stroke">#0000ff</sld:CssParameter>
              <sld:CssParameter name="stroke-linecap">round</sld:CssParameter>
              <sld:CssParameter name="stroke-opacity">0.7</sld:CssParameter>
              <sld:CssParameter name="stroke-width">1.2</sld:CssParameter>
            </sld:Stroke>
          </sld:LineSymbolizer>
        </sld:Rule>
        <sld:Rule>
          <sld:MaxScaleDenominator>10001.0</sld:MaxScaleDenominator>
          <sld:LineSymbolizer>
            <sld:Stroke>
              <sld:CssParameter name="stroke">#0000ff</sld:CssParameter>
              <sld:CssParameter name="stroke-linecap">round</sld:CssParameter>
              <sld:CssParameter name="stroke-opacity">0.7</sld:CssParameter>
              <sld:CssParameter name="stroke-width">1.5</sld:CssParameter>
            </sld:Stroke>
          </sld:LineSymbolizer>
          <sld:TextSymbolizer>
            <sld:Label>
              <ogc:PropertyName>name</ogc:PropertyName>
            </sld:Label>
            <sld:Font>
              <sld:CssParameter name="font-family">DejaVu Sans</sld:CssParameter>
              <sld:CssParameter name="font-size">8.5</sld:CssParameter>
              <sld:CssParameter name="font-style">normal</sld:CssParameter>
              <sld:CssParameter name="font-weight">italic</sld:CssParameter>
            </sld:Font>
            <sld:LabelPlacement>
              <sld:LinePlacement>
                <sld:PerpendicularOffset>7px</sld:PerpendicularOffset>
              </sld:LinePlacement>
            </sld:LabelPlacement>
            <sld:Fill>
              <sld:CssParameter name="fill">#5588cb</sld:CssParameter>
            </sld:Fill>
            <sld:VendorOption name="followLine">true</sld:VendorOption>
            <sld:VendorOption name="maxAngleDelta">90</sld:VendorOption>
            <sld:VendorOption name="maxDisplacement">800</sld:VendorOption>
            <sld:VendorOption name="repeat">500</sld:VendorOption>
            <sld:VendorOption name="spaceAround">10</sld:VendorOption>
          </sld:TextSymbolizer>
        </sld:Rule>
        <sld:VendorOption name="ruleEvaluation">first</sld:VendorOption>
      </sld:FeatureTypeStyle>
    </sld:UserStyle>
  </sld:NamedLayer>
</sld:StyledLayerDescriptor>

